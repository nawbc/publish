import { ApiError, ErrorCode } from '../ApiError';
import type { Cred } from '../cred';
import type { FileFlag } from '../file';
import type { FileContents, FileSystemMetadata } from '../filesystem';
import { BaseFileSystem } from '../filesystem';
import type { Stats } from '../stats';
import type { ProviderOptions } from './provider';
import { CreateProvider } from './provider';

/**
 * @hidden
 */
declare const importScripts: (...path: string[]) => unknown;

/**
 * An RPC message
 */
interface RPCMessage {
  isBFS: true;
  id: number;
}

type _FSAsyncMethods = {
  [Method in keyof FileSystem]: Extract<
    FileSystem[Method],
    (...args: unknown[]) => Promise<unknown>
  >;
};

type _RPCFSRequests = {
  [Method in keyof _FSAsyncMethods]: {
    method: Method;
    args: Parameters<_FSAsyncMethods[Method]>;
  };
};

type _RPCFSResponses = {
  [Method in keyof _FSAsyncMethods]: {
    method: Method;
    value: Awaited<ReturnType<_FSAsyncMethods[Method]>>;
  };
};

/**
 * @see https://stackoverflow.com/a/60920767/17637456
 */
type RPCRequest = RPCMessage &
  (
    | _RPCFSRequests[keyof _FSAsyncMethods]
    | { method: 'metadata'; args: [] }
    | { method: 'syncClose'; args: [string, File] }
  );

type RPCResponse = RPCMessage &
  (
    | _RPCFSResponses[keyof _FSAsyncMethods]
    | { method: 'metadata'; value: FileSystemMetadata }
    | { method: 'syncClose'; value: null }
  );

function isRPCMessage(arg: unknown): arg is RPCMessage {
  return typeof arg == 'object' && 'isBFS' in arg! && !!arg.isBFS;
}

type _executor = Parameters<ConstructorParameters<typeof Promise>[0]>;
interface WorkerRequest {
  resolve: _executor[0];
  reject: _executor[1];
}

export interface WorkerFsProviderOptions {
  /**
   * The target worker that you want to connect to, or the current worker if in a worker context.
   */
  worker: Worker;
}

type _RPCExtractReturnValue<T extends RPCResponse['method']> = Promise<
  Extract<RPCResponse, { method: T }>['value']
>;

/**
 * WorkerFsProvider lets you access a BrowserFS instance that is running in a different
 * JavaScript context (e.g. access BrowserFS in one of your WebWorkers, or
 * access BrowserFS running on the main page from a WebWorker).
 *
 * For example, to have a WebWorker access files in the main browser thread,
 * do the following:
 *
 * MAIN BROWSER THREAD:
 *
 * ```javascript
 *   // Listen for remote file system requests.
 *   BrowserFS.Provider.WorkerFsProvider.attachRemoteListener(webWorkerObject);
 * ```
 *
 * WEBWORKER THREAD:
 *
 * ```javascript
 *   // Set the remote file system as the root file system.
 *   BrowserFS.configure({ fs: "WorkerFsProvider", options: { worker: self }}, function(e) {
 *     // Ready!
 *   });
 * ```
 *
 * Note that synchronous operations are not permitted on the WorkerFsProvider, regardless
 * of the configuration option of the remote FS.
 */
export class WorkerFsProvider extends BaseFileSystem {
  public static override readonly Name = 'Worker';

  public static Create = CreateProvider.bind(this);

  public static readonly Options: ProviderOptions = {
    worker: {
      type: 'object',
      description:
        'The target worker that you want to connect to, or the current worker if in a worker context.',
      validator(worker: Worker) {
        // Check for a `postMessage` function.
        if (typeof worker?.postMessage != 'function') {
          throw new ApiError(
            ErrorCode.EINVAL,
            'option must be a Web Worker instance.',
          );
        }
      },
    },
  };

  public static isAvailable(): boolean {
    return (
      typeof importScripts !== 'undefined' || typeof Worker !== 'undefined'
    );
  }

  private _worker: Worker;
  private _currentID: number = 0;
  private _requests: Map<number, WorkerRequest> = new Map();

  private _isInitialized: boolean = false;
  private _metadata!: FileSystemMetadata;

  /**
   * Constructs a new WorkerFsProvider instance that connects with BrowserFS running on
   * the specified worker.
   */
  public constructor({ worker }: WorkerFsProviderOptions) {
    super();
    this._worker = worker;
    this._worker.onmessage = (event: MessageEvent) => {
      if (!isRPCMessage(event.data)) {
        return;
      }
      const { id, method, value } = event.data as RPCResponse;

      if (method === 'metadata') {
        this._metadata = value;
        this._isInitialized = true;
        return;
      }

      const { resolve, reject } = this._requests.get(id)!;
      this._requests.delete(id);
      if (
        (value as any) instanceof Error ||
        (value as any) instanceof ApiError
      ) {
        reject(value);
        return;
      }
      resolve(value);
    };
  }

  public override get metadata(): FileSystemMetadata {
    return {
      ...super.metadata,
      ...this._metadata,
      name: WorkerFsProvider.Name,
      synchronous: false,
    };
  }

  private async _rpc<T extends RPCRequest['method']>(
    method: T,
    ...args: Extract<RPCRequest, { method: T }>['args']
  ): _RPCExtractReturnValue<T> {
    return new Promise((resolve, reject) => {
      const id = this._currentID++;
      this._requests.set(id, { resolve, reject } as WorkerRequest);
      this._worker.postMessage({
        isBFS: true,
        id,
        method,
        args,
      } as RPCRequest);
    });
  }

  public override rename(
    oldPath: string,
    newPath: string,
    cred: Cred,
  ): Promise<void> {
    return this._rpc('rename', oldPath, newPath, cred);
  }
  public override stat(p: string, cred: Cred): Promise<Stats> {
    return this._rpc('stat', p, cred);
  }
  public override open(
    p: string,
    flag: FileFlag,
    mode: number,
    cred: Cred,
  ): Promise<File> {
    return this._rpc('open', p, flag, mode, cred);
  }
  public override unlink(p: string, cred: Cred): Promise<void> {
    return this._rpc('unlink', p, cred);
  }
  public override rmdir(p: string, cred: Cred): Promise<void> {
    return this._rpc('rmdir', p, cred);
  }
  public override mkdir(p: string, mode: number, cred: Cred): Promise<void> {
    return this._rpc('mkdir', p, mode, cred);
  }
  public override readdir(p: string, cred: Cred): Promise<string[]> {
    return this._rpc('readdir', p, cred);
  }
  public override exists(p: string, cred: Cred): Promise<boolean> {
    return this._rpc('exists', p, cred);
  }
  public override realpath(p: string, cred: Cred): Promise<string> {
    return this._rpc('realpath', p, cred);
  }
  public override truncate(p: string, len: number, cred: Cred): Promise<void> {
    return this._rpc('truncate', p, len, cred);
  }
  public override readFile(
    fname: string,
    encoding: BufferEncoding,
    flag: FileFlag,
    cred: Cred,
  ): Promise<FileContents> {
    return this._rpc('readFile', fname, encoding, flag, cred);
  }
  public override writeFile(
    fname: string,
    data: FileContents,
    encoding: BufferEncoding,
    flag: FileFlag,
    mode: number,
    cred: Cred,
  ): Promise<void> {
    return this._rpc('writeFile', fname, data, encoding, flag, mode, cred);
  }
  public override appendFile(
    fname: string,
    data: FileContents,
    encoding: BufferEncoding,
    flag: FileFlag,
    mode: number,
    cred: Cred,
  ): Promise<void> {
    return this._rpc('appendFile', fname, data, encoding, flag, mode, cred);
  }
  public override chmod(p: string, mode: number, cred: Cred): Promise<void> {
    return this._rpc('chmod', p, mode, cred);
  }
  public override chown(
    p: string,
    new_uid: number,
    new_gid: number,
    cred: Cred,
  ): Promise<void> {
    return this._rpc('chown', p, new_uid, new_gid, cred);
  }
  public override utimes(
    p: string,
    atime: Date,
    mtime: Date,
    cred: Cred,
  ): Promise<void> {
    return this._rpc('utimes', p, atime, mtime, cred);
  }
  public override link(
    srcpath: string,
    dstpath: string,
    cred: Cred,
  ): Promise<void> {
    return this._rpc('link', srcpath, dstpath, cred);
  }
  public override symlink(
    srcpath: string,
    dstpath: string,
    type: string,
    cred: Cred,
  ): Promise<void> {
    return this._rpc('symlink', srcpath, dstpath, type, cred);
  }
  public override readlink(p: string, cred: Cred): Promise<string> {
    return this._rpc('readlink', p, cred);
  }

  public syncClose(method: string, fd: File): Promise<void> {
    return this._rpc('syncClose', method, fd);
  }
}
