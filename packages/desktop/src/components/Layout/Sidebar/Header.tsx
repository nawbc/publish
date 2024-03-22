import { ActionIcon, rem, Tooltip } from '@mantine/core';
import { IconLayoutSidebarLeftExpand } from '@publish/shared';
import type { PropsWithChildren } from 'react';
import { forwardRef, useCallback } from 'react';
import { IF } from 'reactgets';
import { useTauriOS } from 'tauri-reactgets';

import { DarwinNativeTitleBar } from '../../NativeTitleBar';
import { useDividerPanel } from '../DividerPanel';
import { DraggableHeader } from '../DraggableHeader';

interface SidebarHeaderProps extends PropsWithChildren {}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  (props, _ref) => {
    const { children } = props;
    const panel = useDividerPanel();
    const os = useTauriOS();
    const handleCollapse = useCallback(() => {
      panel?.collapse();
    }, [panel]);

    return (
      <DraggableHeader ml={rem(18)}>
        <IF is={os.type === 'macos'}>
          <DarwinNativeTitleBar />
        </IF>
        <Tooltip openDelay={2000} label="Expand sidebar">
          <ActionIcon onClick={handleCollapse}>
            <IconLayoutSidebarLeftExpand />
          </ActionIcon>
        </Tooltip>
        {children}
      </DraggableHeader>
    );
  },
);

SidebarHeader.displayName = '@publish/desktop/SidebarHeader';
