import type { Window as NativeWindow } from '@tauri-apps/api/window';
import { createContext } from 'react';

import type { Nullish } from '../types';

export interface TauriWindowContextProps {
  current?: NativeWindow | Nullish;
}

export const TauriWindowContext = createContext<TauriWindowContextProps>({
  current: null,
});
