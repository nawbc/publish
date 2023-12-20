import { ApiError, ErrorCode } from '../ApiError';
import type { Cred } from '../cred';
import { R_OK } from '../emulation/constants';
import { fetchFile, fetchFileSize, fetchIsAvailable } from '../fetch';
import type { FileFlag } from '../file';
import { ActionType, NoSyncFile } from '../file';
import { FileIndex, isIndexDirInode, isIndexFileInode } from '../FileIndex';
import type { FileContents, FileSystemMetadata } from '../filesystem';
import { BaseFileSystem } from '../filesystem';
import { Stats } from '../stats';
import { decode } from '../utils';
import type { ProviderOptions } from './provider';
import { CreateProvider } from './provider';

export interface HTTPRequestIndex {
  [key: string]: string;
}

/**
 * Configuration options for a HTTPRequest file system.
 */
export interface HTTPRequestOptions {
  /**
   * URL to a file index as a JSON file or the file index object itself, generated with the make_http_index script.
   * Defaults to `index.json`.
   */
  index?: string | HTTPRequestIndex;

  /** Used as the URL prefix for fetched files.
   * Default: Fetch files relative to the index.
   */
  baseUrl?: string;
}

/**
 * A simple filesystem backed by HTTP downloads. You must create a directory listing using the
 * `make_http_index` tool provided by BrowserFS.
 *
 * If you install BrowserFS globally with `npm i -g browserfs`, you can generate a listing by
 * running `make_http_index` in your terminal in the directory you would like to index:
 *
 * ```
 * make_http_index > index.json
 * ```
 *
 * Listings objects look like the following:
 *
 * ```json
 * {
 *   "home": {
 *     "jvilk": {
 *       "someFile.txt": null,
 *       "someDir": {
 *         // Empty directory
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * *This example has the folder `/home/jvilk` with subfile `someFile.txt` and subfolder `someDir`.*
 */
export class HTTPRequest extends BaseFileSystem {
  public static override readonly Name = 'HTTPRequest';

  public static Create = CreateProvider.bind(this);

  public static readonly Options: ProviderOptions = {
    index: {
      type: ['string', 'object'],
      optional: true,
      description:
        'URL to a file index as a JSON file or the file index object itself, generated with the make_http_index script. Defaults to `index.json`.',
    },
    baseUrl: {
      type: 'string',
      optional: true,
      description:
        'Used as the URL prefix for fetched files. Default: Fetch files relative to the index.',
    },
  };

  public static isAvailable(): boolean {
    return fetchIsAvailable;
  }

  public readonly prefixUrl: string;
  private _index!: FileIndex<{}>;

  constructor({ index, baseUrl = '' }: HTTPRequestOptions) {
    super();
    if (!index) {
      index = 'index.json';
    }

    const indexRequest =
      typeof index == 'string'
        ? fetchFile(index, 'json')
        : Promise.resolve(index);
    this._ready = indexRequest.then((data) => {
      this._index = FileIndex.fromListing(data);
      return this;
    });

    // prefix_url must end in a directory separator.
    if (baseUrl.length > 0 && baseUrl.charAt(baseUrl.length - 1) !== '/') {
      baseUrl = baseUrl + '/';
    }
    this.prefixUrl = baseUrl;
  }

  public override get metadata(): FileSystemMetadata {
    return {
      ...super.metadata,
      name: HTTPRequest.Name,
      readonly: true,
    };
  }

  public empty(): void {
    this._index.fileIterator(function (file: Stats) {
      file.fileData = null;
    });
  }

  /**
   * Special HTTPFS function: Preload the given file into the index.
   * @param path
   * @param buffer
   */
  public preloadFile(path: string, buffer: Uint8Array): void {
    const inode = this._index.getInode(path);
    if (isIndexFileInode<Stats>(inode)) {
      if (inode === null) {
        throw ApiError.ENOENT(path);
      }
      const stats = inode.getData();
      stats.size = buffer.length;
      stats.fileData = buffer;
    } else {
      throw ApiError.EISDIR(path);
    }
  }

  public override async stat(path: string, cred: Cred): Promise<Stats> {
    const inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    if (!inode.toStats().hasAccess(R_OK, cred)) {
      throw ApiError.EACCES(path);
    }
    let stats: Stats;
    if (isIndexFileInode<Stats>(inode)) {
      stats = inode.getData();
      // At this point, a non-opened file will still have default stats from the listing.
      if (stats.size < 0) {
        stats.size = await this._requestFileSize(path);
      }
    } else if (isIndexDirInode(inode)) {
      stats = inode.getStats();
    } else {
      throw ApiError.FileError(ErrorCode.EINVAL, path);
    }
    return stats;
  }

  public override async open(
    path: string,
    flags: FileFlag,
    mode: number,
    cred: Cred,
  ): Promise<NoSyncFile<this>> {
    // INVARIANT: You can't write to files on this file system.
    if (flags.isWriteable()) {
      throw new ApiError(ErrorCode.EPERM, path);
    }
    // Check if the path exists, and is a file.
    const inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    if (!inode.toStats().hasAccess(flags.getMode(), cred)) {
      throw ApiError.EACCES(path);
    }
    if (isIndexFileInode<Stats>(inode) || isIndexDirInode<Stats>(inode)) {
      switch (flags.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
        case ActionType.TRUNCATE_FILE:
          throw ApiError.EEXIST(path);
        case ActionType.NOP:
          if (isIndexDirInode<Stats>(inode)) {
            const stats = inode.getStats();
            return new NoSyncFile(
              this,
              path,
              flags,
              stats,
              stats.fileData || undefined,
            );
          }
          const stats = inode.getData();
          // Use existing file contents.
          // XXX: Uh, this maintains the previously-used flag.
          if (stats.fileData) {
            return new NoSyncFile(
              this,
              path,
              flags,
              Stats.clone(stats),
              stats.fileData,
            );
          }
          // @todo be lazier about actually requesting the file
          const buffer = await this._requestFile(path, 'buffer');
          // we don't initially have file sizes
          stats.size = buffer.length;
          stats.fileData = buffer;
          return new NoSyncFile(this, path, flags, Stats.clone(stats), buffer);
        default:
          throw new ApiError(ErrorCode.EINVAL, 'Invalid FileMode object.');
      }
    } else {
      throw ApiError.EPERM(path);
    }
  }

  public override async readdir(path: string, cred: Cred): Promise<string[]> {
    return this.readdirSync(path, cred);
  }

  /**
   * We have the entire file as a buffer; optimize readFile.
   */
  public async readFile(
    fname: string,
    encoding: BufferEncoding,
    flag: FileFlag,
    cred: Cred,
  ): Promise<FileContents> {
    // Get file.
    const fd = await this.open(fname, flag, 0o644, cred);
    try {
      const fdCast = <NoSyncFile<HTTPRequest>>fd;
      const fdBuff = fdCast.getBuffer();
      return encoding ? decode(fdBuff) : fdBuff;
    } finally {
      await fd.close();
    }
  }

  private _getHTTPPath(filePath: string): string {
    if (filePath.charAt(0) === '/') {
      filePath = filePath.slice(1);
    }
    return this.prefixUrl + filePath;
  }

  /**
   * Asynchronously download the given file.
   */
  private _requestFile(p: string, type: 'buffer'): Promise<Uint8Array>;
  private _requestFile(p: string, type: 'json'): Promise<any>;
  private _requestFile(p: string, type: 'buffer' | 'json'): Promise<any>;
  private _requestFile(p: string, type: 'buffer' | 'json'): Promise<any> {
    return fetchFile(this._getHTTPPath(p), type);
  }

  /**
   * Only requests the HEAD content, for the file size.
   */
  private _requestFileSize(path: string): Promise<number> {
    return fetchFileSize(this._getHTTPPath(path));
  }
}
