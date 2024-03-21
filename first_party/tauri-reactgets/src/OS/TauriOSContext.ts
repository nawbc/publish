import type { Arch, Family, OsType, Platform } from '@tauri-apps/plugin-os';
import { createContext } from 'react';

import type { Nullish } from '../types';

export interface TauriOSContextProps {
  arch?: Arch;
  eol?: string | Nullish;
  exeExtension?: string | Nullish;
  family?: Family;
  hostname?: string | Nullish;
  locale?: string | Nullish;
  platform?: Platform;
  type?: OsType | Nullish;
  version?: string | Nullish;
}

export const TauriOSContext = createContext<TauriOSContextProps>({
  arch: undefined,
  eol: undefined,
  exeExtension: null,
  family: undefined,
  hostname: undefined,
  locale: undefined,
  platform: undefined,
  type: undefined,
  version: undefined,
});
