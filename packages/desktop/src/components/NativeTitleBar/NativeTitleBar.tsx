import { type FC, type PropsWithChildren } from 'react';

import { useNativeWindow } from '../NativeWindow';

export interface NativeTitleBarProps extends PropsWithChildren {
  label?: string;
}

export const NativeTitleBar: FC<NativeTitleBarProps> = function (props) {
  const { current } = useNativeWindow();

  return <></>;
};

NativeTitleBar.defaultProps = {};
