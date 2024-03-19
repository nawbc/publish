import { Center, Group } from '@mantine/core';
import { type FC, type PropsWithChildren } from 'react';

import { useNativeWindow } from '../NativeWindow';
import {
  IconWindowsClose,
  IconWindowsMaximize,
  IconWindowsMaximizeRestore,
  IconWindowsMinimize,
} from './Icons';
import classes from './NativeTitleBar.module.css';

export interface WindowsNativeTitleBarProps extends PropsWithChildren {
  label?: string;
}

export const WindowsNativeTitleBar: FC<WindowsNativeTitleBarProps> =
  function () {
    const { current } = useNativeWindow();

    return (
      <Group data-os="windows" gap={0} className={classes.root}>
        <Center component="button" onClick={async () => current?.minimize()}>
          <IconWindowsMinimize />
        </Center>
        <Center component="button" onClick={() => {}}>
          {!current?.isMaximized() ? (
            <IconWindowsMaximize />
          ) : (
            <IconWindowsMaximizeRestore />
          )}
        </Center>
        <Center data-close component="button" onClick={current?.close}>
          <IconWindowsClose />
        </Center>
      </Group>
    );
  };

WindowsNativeTitleBar.defaultProps = {};
