import type { BFSCallback, FileSystem } from '../filesystem';
import { checkOptions } from '../utils';

/**
 * Describes a file system option.
 */
export interface ProviderOption<T> {
  /**
   * The basic JavaScript type(s) for this option.
   */
  type: string | string[];

  /**
   * Whether or not the option is optional (e.g., can be set to null or undefined).
   * Defaults to `false`.
   */
  optional?: boolean;

  /**
   * Description of the option. Used in error messages and documentation.
   */
  description: string;

  /**
   * A custom validation function to check if the option is valid.
   * When async, resolves if valid and rejects if not.
   * When sync, it will throw an error if not valid.
   */
  validator?(opt: T): void | Promise<void>;
}

/**
 * Describes all of the options available in a file system.
 */
export interface ProviderOptions {
  [name: string]: ProviderOption<unknown>;
}

/**
 * Contains types for static functions on a provider.
 */
export interface BaseProviderConstructor<
  FS extends typeof FileSystem = typeof FileSystem,
> {
  new (...params: ConstructorParameters<FS>): InstanceType<FS>;

  /**
   * A name to identify the provider.
   */
  Name: string;

  /**
   * Describes all of the options available for this provider.
   */
  Options: ProviderOptions;

  /**
   * Whether the provider is available in the current environment.
   * It supports checking synchronously and asynchronously
   * Sync:
   * Returns 'true' if this provider is available in the current
   * environment. For example, a `localStorage`-backed filesystem will return
   * 'false' if the browser does not support that API.
   *
   * Defaults to 'false', as the FileSystem base class isn't usable alone.
   */
  isAvailable(): boolean;
}

/**
 * Contains types for static functions on a provider.
 */
export interface ProviderConstructor<
  FS extends typeof FileSystem = typeof FileSystem,
> extends BaseProviderConstructor<FS> {
  /**
   * Creates provider of this given type with the given
   * options, and either returns the result in a promise or callback.
   */
  Create(): Promise<InstanceType<FS>>;
  Create(options: object): Promise<InstanceType<FS>>;
  Create(cb: BFSCallback<InstanceType<FS>>): void;
  Create(options: object, cb: BFSCallback<InstanceType<FS>>): void;
  Create(
    options: object,
    cb?: BFSCallback<InstanceType<FS>>,
  ): Promise<InstanceType<FS>> | void;
}

export function CreateProvider<FS extends BaseProviderConstructor>(
  this: FS,
): Promise<InstanceType<FS>>;
export function CreateProvider<FS extends BaseProviderConstructor>(
  this: FS,
  options: ProviderOptions,
): Promise<InstanceType<FS>>;
export function CreateProvider<FS extends BaseProviderConstructor>(
  this: FS,
  cb: BFSCallback<InstanceType<FS>>,
): void;
export function CreateProvider<FS extends BaseProviderConstructor>(
  this: FS,
  options: ProviderOptions,
  cb: BFSCallback<InstanceType<FS>>,
): void;
export function CreateProvider<FS extends BaseProviderConstructor>(
  this: FS,
  options?: ProviderOptions | BFSCallback<InstanceType<FS>>,
  cb?: BFSCallback<InstanceType<FS>>,
): Promise<InstanceType<FS>> | void {
  cb = typeof options === 'function' ? options : cb;

  checkOptions(this, options!);

  const fs = new this(
    typeof options === 'function' ? {} : options,
  ) as InstanceType<FS>;

  // Promise
  if (typeof cb != 'function') {
    return fs.whenReady();
  }

  // Callback
  fs.whenReady()
    .then((fs) => cb!(undefined, fs))
    .catch((err) => cb!(err));
}
