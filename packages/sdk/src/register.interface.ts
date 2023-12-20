import type { PublishPluginPermissions } from './permissions';

export interface Author {
  name: string;
  avatar?: string;
  email: string;
  /**
   * Additional descriptions
   * Optional
   */
  additional: string;
}

export interface Update {
  mode: 'npm' | 'github';
  url: string;
}

export interface Fs {
  /**
   * Allow visit paths
   */
  scope: string[];
}

export interface Network {
  /**
   * Allow visit domains
   */
  hosts: string[];
}

export interface Manifest {
  /**
   * Protection Levels:
   * @example
   * ```
   * Protection Levels:
   * | Value     | Meaning                                                      |
   * | --------- | ------------------------------------------------------------ |
   * | normal    | This is the lowest level of permission and does not require explicit user consent. These permissions do not typically pose a risk to the user's privacy or device security. |
   * | dangerous | A higher-risk permission that gives a requesting application access to private user data or control over the device that can negatively impact the user. |
   * ```
   */
  permissions: PublishPluginPermissions;
  name: string;
  version: string;
  /**
   * Register manifest version
   */
  manifestVersion: number;
  author: Author;
  homepage?: string;
  packageName: string;
  description?: string;
  update: Update;
  /**
   * Available locates
   * ISO 3166-1 alpha-2 code
   * @see {@link https://github.com/annexare/Countries}
   */
  locates: string[];
  /**
   * Web unavailable
   */
  fs?: Fs;
  network?: Network;
}
