import { getCurrent, Window } from '@tauri-apps/api/window';
import { type FC, type PropsWithChildren, useMemo } from 'react';

import { NativeWindowContext } from './NativeWindowContext';

export interface NativeWindowProviderProps extends PropsWithChildren {
  label?: string;
}

export const NativeWindowProvider: FC<NativeWindowProviderProps> = function (
  props,
) {
  const { children, label } = props;

  const nativeWindow = useMemo(
    () => (label ? Window.getByLabel(label) : getCurrent()),
    [label],
  );

  const context = useMemo(
    () => ({
      current: nativeWindow,
    }),
    [nativeWindow],
  );

  return (
    <NativeWindowContext.Provider value={context}>
      {children}
    </NativeWindowContext.Provider>
  );
};

NativeWindowProvider.defaultProps = {};
