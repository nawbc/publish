import { ApiError, ErrorCode } from '../ApiError';
import { Cred } from '../cred';
import { basename, dirname, join } from '../emulation/path';
import { FileFlag, PreloadFile } from '../file';
import type { FileSystemMetadata } from '../filesystem';
import { BaseFileSystem } from '../filesystem';
import { FileType, Stats } from '../stats';
import type { BaseProviderConstructor, ProviderOptions } from './provider';
import { CreateProvider } from './provider';

declare global {
  interface FileSystemDirectoryHandle {
    [Symbol.iterator](): IterableIterator<[string, FileSystemHandle]>;
    entries(): IterableIterator<[string, FileSystemHandle]>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<FileSystemHandle>;
  }
}

interface FileSystemAccessProviderOptions {
  handle: FileSystemDirectoryHandle;
}

const handleError = (path = '', error: Error) => {
  if (error.name === 'NotFoundError') {
    throw ApiError.ENOENT(path);
  }

  throw error as ApiError;
};

export class FileSystemAccessFile extends PreloadFile<FileSystemAccessProvider> {
  constructor(
    _fs: FileSystemAccessProvider,
    _path: string,
    _flag: FileFlag,
    _stat: Stats,
    contents?: Uint8Array,
  ) {
    super(_fs, _path, _flag, _stat, contents);
  }

  public override async sync(): Promise<void> {
    if (this.isDirty()) {
      await this._fs._sync(
        this.getPath(),
        this.getBuffer(),
        this.getStats(),
        Cred.Root,
      );
      this.resetDirty();
    }
  }

  public override async close(): Promise<void> {
    await this.sync();
  }
}

export class FileSystemAccessProvider extends BaseFileSystem {
  public static override readonly Name = 'FileSystemAccess';

  public static Create = CreateProvider.bind(this);

  public static readonly Options: ProviderOptions = {};

  public static isAvailable(): boolean {
    return typeof FileSystemHandle === 'function';
  }

  private _handles: Map<string, FileSystemHandle> = new Map();

  public constructor({ handle }: FileSystemAccessProviderOptions) {
    super();
    this._handles.set('/', handle);
  }

  public override get metadata(): FileSystemMetadata {
    return {
      ...super.metadata,
      name: FileSystemAccessProvider.Name,
    };
  }

  public async _sync(
    p: string,
    data: Uint8Array,
    stats: Stats,
    cred: Cred,
  ): Promise<void> {
    const currentStats = await this.stat(p, cred);
    if (stats.mtime !== currentStats!.mtime) {
      await this.writeFile(
        p,
        data,
        FileFlag.getFileFlag('w'),
        currentStats!.mode,
        cred,
      );
    }
  }

  public override async rename(
    oldPath: string,
    newPath: string,
    cred: Cred,
  ): Promise<void> {
    try {
      const handle = await this.getHandle(oldPath);
      if (handle instanceof FileSystemDirectoryHandle) {
        const files = await this.readdir(oldPath, cred);

        await this.mkdir(newPath, 'wx', cred);
        if (files.length === 0) {
          await this.unlink(oldPath, cred);
        } else {
          for (const file of files) {
            await this.rename(join(oldPath, file), join(newPath, file), cred);
            await this.unlink(oldPath, cred);
          }
        }
      }
      if (handle instanceof FileSystemFileHandle) {
        const oldFile = await handle.getFile(),
          destFolder = await this.getHandle(dirname(newPath));
        if (destFolder instanceof FileSystemDirectoryHandle) {
          const newFile = await destFolder.getFileHandle(basename(newPath), {
            create: true,
          });
          const writable = await newFile.createWritable();
          const buffer = await oldFile.arrayBuffer();
          await writable.write(buffer);

          writable.close();
          await this.unlink(oldPath, cred);
        }
      }
    } catch (err: any) {
      handleError(oldPath, err);
    }
  }

  public override async writeFile(
    fname: string,
    data: any,
    // encoding: string | null,
    flag: FileFlag,
    mode: number,
    cred: Cred,
    // createFile?: boolean,
  ): Promise<void> {
    const handle = await this.getHandle(dirname(fname));
    if (handle instanceof FileSystemDirectoryHandle) {
      const file = await handle.getFileHandle(basename(fname), {
        create: true,
      });
      const writable = await file.createWritable();
      await writable.write(data);
      await writable.close();
      //return createFile ? this.newFile(fname, flag, data) : undefined;
    }
  }

  public override async createFile(
    p: string,
    flag: FileFlag,
    mode: number,
    cred: Cred,
  ): Promise<FileSystemAccessFile> {
    await this.writeFile(p, new Uint8Array(), flag, mode, cred);
    return this.openFile(p, flag, cred);
  }

  public override async stat(path: string, cred: Cred): Promise<Stats> {
    const handle = await this.getHandle(path);
    if (!handle) {
      throw ApiError.FileError(ErrorCode.EINVAL, path);
    }
    if (handle instanceof FileSystemDirectoryHandle) {
      return new Stats(FileType.DIRECTORY, 4096);
    }
    if (handle instanceof FileSystemFileHandle) {
      const { lastModified, size } = await handle.getFile();
      return new Stats(FileType.FILE, size, undefined, undefined, lastModified);
    }
    return undefined as unknown as Stats;
  }

  public override async exists(p: string, cred: Cred): Promise<boolean> {
    try {
      await this.getHandle(p);
      return true;
    } catch (e) {
      return false;
    }
  }

  public override async openFile(
    path: string,
    flags: FileFlag,
    cred: Cred,
  ): Promise<FileSystemAccessFile> {
    const handle = await this.getHandle(path);
    if (handle instanceof FileSystemFileHandle) {
      const file = await handle.getFile();
      const buffer = await file.arrayBuffer();
      return this.newFile(path, flags, buffer, file.size, file.lastModified);
    }
    return undefined as any;
  }

  public override async unlink(path: string, cred: Cred): Promise<void> {
    const handle = await this.getHandle(dirname(path));
    if (handle instanceof FileSystemDirectoryHandle) {
      try {
        await handle.removeEntry(basename(path), { recursive: true });
      } catch (e: any) {
        handleError(path, e);
      }
    }
  }

  public override async rmdir(path: string, cred: Cred): Promise<void> {
    return this.unlink(path, cred);
  }

  public override async mkdir(p: string, mode: any, cred: Cred): Promise<void> {
    const overwrite =
      mode && mode.flag && mode.flag.includes('w') && !mode.flag.includes('x');

    const existingHandle = await this.getHandle(p);
    if (existingHandle && !overwrite) {
      throw ApiError.EEXIST(p);
    }

    const handle = await this.getHandle(dirname(p));
    if (handle instanceof FileSystemDirectoryHandle) {
      await handle.getDirectoryHandle(basename(p), { create: true });
    }
  }

  public override async readdir(path: string, cred: Cred): Promise<string[]> {
    const handle = await this.getHandle(path);
    if (!(handle instanceof FileSystemDirectoryHandle)) {
      throw ApiError.ENOTDIR(path);
    }
    const _keys: string[] = [];
    for await (const key of handle.keys()) {
      _keys.push(join(path, key));
    }
    return _keys;
  }

  private newFile(
    path: string,
    flag: FileFlag,
    data: ArrayBuffer,
    size?: number,
    lastModified?: number,
  ): FileSystemAccessFile {
    return new FileSystemAccessFile(
      this,
      path,
      flag,
      new Stats(
        FileType.FILE,
        size || 0,
        undefined,
        undefined,
        lastModified || new Date().getTime(),
      ),
      new Uint8Array(data),
    );
  }

  private async getHandle(path: string): Promise<FileSystemHandle | void> {
    if (this._handles.has(path)) {
      return this._handles.get(path)!;
    }

    let walkedPath = '/';
    const [, ...pathParts] = path.split('/');
    const getHandleParts = async ([
      pathPart,
      ...remainingPathParts
    ]: string[]) => {
      const walkingPath = join(walkedPath, pathPart);
      const continueWalk = (handle: FileSystemHandle) => {
        walkedPath = walkingPath;
        this._handles.set(walkedPath, handle);

        if (remainingPathParts.length === 0) {
          return this._handles.get(path);
        }

        getHandleParts(remainingPathParts);
      };
      const handle = this._handles.get(walkedPath) as FileSystemDirectoryHandle;

      try {
        return await continueWalk(await handle.getDirectoryHandle(pathPart));
      } catch (error: any) {
        if (error.name === 'TypeMismatchError') {
          try {
            return await continueWalk(await handle.getFileHandle(pathPart));
          } catch (err: any) {
            handleError(walkingPath, err);
          }
        } else if (error.message === 'Name is not allowed.') {
          throw new ApiError(ErrorCode.ENOENT, error.message, walkingPath);
        } else {
          handleError(walkingPath, error);
        }
      }
    };

    await getHandleParts(pathParts);
  }
}
