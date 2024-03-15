import type { Nullish } from '@publish/shared';
import type { Window as NativeWindow } from '@tauri-apps/api/window';
import { createContext } from 'react';

export interface NativeWindowContextProps {
  current?: NativeWindow | Nullish;
}

export const NativeWindowContext = createContext<NativeWindowContextProps>({
  current: null,
});
