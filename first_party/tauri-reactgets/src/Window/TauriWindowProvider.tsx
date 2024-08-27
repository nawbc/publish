import { Window } from '@tauri-apps/api/window';
import { type FC, type PropsWithChildren, use, useMemo } from 'react';

import { TauriWindowContext } from './TauriWindowContext';

export interface TauriWindowProviderProps extends PropsWithChildren {
  label?: string;
}

export const TauriWindowProvider: FC<TauriWindowProviderProps> = function (
  props,
) {
  const { children, label } = props;
  const tauriWindow = label
    ? use(Window.getByLabel(label))
    : Window.getCurrent();

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
