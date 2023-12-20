import { ApiError, ErrorCode } from '../ApiError';
import { encode } from '../utils';
import type { BackendOptions } from './backend';
import { CreateBackend } from './backend';
import type {
  SimpleSyncStore,
  SyncKeyValueRWTransaction,
  SyncKeyValueStore,
} from './SyncStore';
import { SimpleSyncRWTransaction, SyncKeyValueFileSystem } from './SyncStore';

/**
 * A synchronous key-value store backed by Storage.
 */
export class StorageStore implements SyncKeyValueStore, SimpleSyncStore {
  public name(): string {
    return StorageFileSystem.Name;
  }

  constructor(protected _storage: Storage) {}

  public clear(): void {
    this._storage.clear();
  }

  public beginTransaction(type: string): SyncKeyValueRWTransaction {
    // No need to differentiate.
    return new SimpleSyncRWTransaction(this);
  }

  public get(key: string): Uint8Array | undefined {
    const data = this._storage.getItem(key);
    if (typeof data != 'string') {
      return;
    }

    return encode(data);
  }

  public put(key: string, data: Uint8Array, overwrite: boolean): boolean {
    try {
      if (!overwrite && this._storage.getItem(key) !== null) {
        // Don't want to overwrite the key!
        return false;
      }
      this._storage.setItem(key, data.toString());
      return true;
    } catch (e) {
      throw new ApiError(ErrorCode.ENOSPC, 'Storage is full.');
    }
  }

  public del(key: string): void {
    try {
      this._storage.removeItem(key);
    } catch (e) {
      throw new ApiError(
        ErrorCode.EIO,
        'Unable to delete key ' + key + ': ' + e,
      );
    }
  }
}

export namespace StorageFileSystem {
  /**
   * Options to pass to the StorageFileSystem
   */
  export interface Options {
    /**
     * The Storage to use. Defaults to globalThis.localStorage.
     */
    storage: Storage;
  }
}

/**
 * A synchronous file system backed by a `Storage` (e.g. localStorage).
 */
export class StorageFileSystem extends SyncKeyValueFileSystem {
  public static override readonly Name = 'Storage';

  public static Create = CreateBackend.bind(this);

  public static readonly Options: BackendOptions = {
    storage: {
      type: 'object',
      optional: true,
      description: 'The Storage to use. Defaults to globalThis.localStorage.',
    },
  };

  public static override isAvailable(
    storage: Storage = globalThis.localStorage,
  ): boolean {
    return storage instanceof Storage;
  }
  /**
   * Creates a new Storage file system using the contents of `Storage`.
   */
  constructor({
    storage = globalThis.localStorage,
  }: StorageFileSystem.Options) {
    super({ store: new StorageStore(storage) });
  }
}
