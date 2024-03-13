import { ActionIcon, Flex, rem, Tooltip } from '@mantine/core';
import { IconLayoutSidebarRightExpand } from '@tabler/icons-react';
import type { PropsWithChildren } from 'react';
import { forwardRef, useCallback } from 'react';

import { useDividerPanel } from '../DividerPanel';

interface SidebarHeaderProps extends PropsWithChildren {}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  (props, ref) => {
    const { children } = props;
    const panel = useDividerPanel();

    const handleCollapse = useCallback(() => {
      panel?.collapse();
    }, [panel]);

    return (
      <Flex
        data-tauri-drag-region
        align="center"
        pos="relative"
        justify="space-between"
        component="nav"
        ref={ref}
        px={rem(18)}
        py="xs"
      >
        <Tooltip openDelay={2000} label="Expand sidebar">
          <ActionIcon onClick={handleCollapse}>
            <IconLayoutSidebarRightExpand size={22} />
          </ActionIcon>
        </Tooltip>
        {children}
      </Flex>
    );
  },
);

SidebarHeader.displayName = '@publish/desktop/SidebarHeader';
