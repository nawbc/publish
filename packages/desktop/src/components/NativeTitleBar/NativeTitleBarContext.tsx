import { createContext } from 'react';

interface NativeTitleBarContextProps {
  window: Window | null;
  isMaximized: boolean;
  minimize();
  maximize: () => Promise<void>;
  fullscreen: () => Promise<void>;
  close: () => Promise<void>;
}

export const NativeTitleBarContext = createContext<NativeTitleBarContextProps>({
  window: null,
  isMaximized: false,
  minimize: () => Promise.resolve(),
  maximize: () => Promise.resolve(),
  fullscreen: () => Promise.resolve(),
  close: () => Promise.resolve(),
});
