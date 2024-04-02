import {
  arch,
  eol,
  exeExtension,
  family,
  hostname,
  locale,
  platform,
  type,
  version,
} from '@tauri-apps/plugin-os';
import {
  type FC,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { TauriOSContextProps } from './TauriOSContext';
import { TauriOSContext } from './TauriOSContext';

export interface TauriOSProviderProps extends PropsWithChildren {}

export const TauriOSProvider: FC<TauriOSProviderProps> = function (props) {
  const { children } = props;
  const [os, setOS] = useState<TauriOSContextProps>({});

  useEffect(() => {
    Promise.all([
      arch(),
      eol(),
      exeExtension(),
      family(),
      hostname(),
      locale(),
      platform(),
      type(),
      version(),
    ]).then(
      ([
        arch,
        eol,
        exeExtension,
        family,
        hostname,
        locale,
        platform,
        type,
        version,
      ]) => {
        setOS({
          arch,
          eol,
          exeExtension,
          family,
          hostname,
          locale,
          platform,
          type,
          version,
        });
      },
    );
  }, []);

  const osContext = useMemo(() => os, [os]);

  return (
    <TauriOSContext.Provider value={osContext}>
      {children}
    </TauriOSContext.Provider>
  );
};
