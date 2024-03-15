import { Group, UnstyledButton } from '@mantine/core';
import { type FC, type PropsWithChildren } from 'react';

import { useNativeWindow } from '../NativeWindow';
import {
  IconWindowsClose,
  IconWindowsMaximize,
  IconWindowsMinimize,
} from './Icons';

export interface WindowsNativeTitleBarProps extends PropsWithChildren {
  label?: string;
}

export const WindowsNativeTitleBar: FC<WindowsNativeTitleBarProps> = function (
  props,
) {
  const { current } = useNativeWindow();

  return (
    <Group>
      <UnstyledButton className="">
        <IconWindowsMinimize />
      </UnstyledButton>
      <UnstyledButton>
        <IconWindowsMaximize />
      </UnstyledButton>
      <UnstyledButton>
        <IconWindowsClose />
      </UnstyledButton>
    </Group>
  );
};

WindowsNativeTitleBar.defaultProps = {};
