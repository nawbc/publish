import { getCurrent, Window } from '@tauri-apps/api/window';
import { type FC, type PropsWithChildren, useMemo } from 'react';

import { TauriWindowContext } from './TauriWindowContext';

export interface TauriWindowProviderProps extends PropsWithChildren {
  label?: string;
}

export const TauriWindowProvider: FC<TauriWindowProviderProps> = function (
  props,
) {
  const { children, label } = props;

  const tauriWindow = useMemo(
    () => (label ? Window.getByLabel(label) : getCurrent()),
    [label],
  );

  const context = useMemo(
    () => ({
      current: tauriWindow,
    }),
    [tauriWindow],
  );

  return (
    <TauriWindowContext.Provider value={context}>
      {children}
    </TauriWindowContext.Provider>
  );
};
