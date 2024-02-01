import { ActionIcon, Flex, Group, rem, Tooltip } from '@mantine/core';
import { Transition } from '@mantine/core';
import {
  IconArrowsVertical,
  IconLayoutSidebarRightExpand,
} from '@tabler/icons-react';
import type { PropsWithChildren } from 'react';
import { forwardRef, useCallback } from 'react';

import { useDividerPanel } from '../DividerPanel';
import { useExplorerContext } from '../Explorer';

interface SidebarHeaderProps extends PropsWithChildren {}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  (props, ref) => {
    const { children } = props;
    const panel = useDividerPanel();
    const explorer = useExplorerContext();

    const handleCollapse = useCallback(() => {
      panel?.collapse();
    }, [panel]);

    return (
      <Flex
        align="center"
        pos="relative"
        justify="space-between"
        component="nav"
        ref={ref}
        px={rem(18)}
        py="xs"
      >
        <Transition
          mounted={panel?.expanded as boolean}
          transition="fade"
          duration={200}
          timingFunction="ease"
        >
          {(styles) => (
            <Tooltip openDelay={2000} label="Expand sidebar">
              <ActionIcon
                c="gray.7"
                style={{ ...styles }}
                onClick={handleCollapse}
              >
                <IconLayoutSidebarRightExpand size={22} />
              </ActionIcon>
            </Tooltip>
          )}
        </Transition>

        <Group>
          <ActionIcon
            c="gray.7"
            size="xs"
            onClick={() => {
              explorer.toggle();
            }}
          >
            <IconArrowsVertical size={18} />
          </ActionIcon>
        </Group>

        {children}
      </Flex>
    );
  },
);

SidebarHeader.displayName = '@publish/desktop/SidebarHeader';
