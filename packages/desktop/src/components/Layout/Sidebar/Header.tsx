import { ActionIcon, Box, rem, Tooltip } from '@mantine/core';
import { IconLayoutSidebarRightExpand } from '@tabler/icons-react';
import type { PropsWithChildren } from 'react';
import { forwardRef, useCallback } from 'react';

import { useSplitPanel } from '../SplitPanel';

interface SidebarHeaderProps extends PropsWithChildren {}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  (props, ref) => {
    const { children } = props;
    const panel = useSplitPanel();

    const handleCollapse = useCallback(() => {
      panel?.collapse();
    }, [panel]);

    return (
      <Box component="nav" ref={ref} px={rem(18)} py="xs">
        <Tooltip label="Tooltip">
          <ActionIcon c="gray" onClick={handleCollapse}>
            <IconLayoutSidebarRightExpand />
          </ActionIcon>
        </Tooltip>

        {children}
      </Box>
    );
  },
);

SidebarHeader.displayName = '@publish/desktop/SidebarHeader';
