import {
  ActionIcon,
  Box,
  Container,
  rem,
  ScrollArea,
  Tooltip,
} from '@mantine/core';
import { PublishDocEditor } from '@publish/doc-editor/preset/index.js';
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import type { PropsWithChildren } from 'react';
import { type FC, useCallback } from 'react';
import { Outlet } from 'react-router';

import { DividerPanel, useDividerPanel } from './DividerPanel';
import { ExplorerProvider } from './Explorer';
import * as styles from './layout.css';
import { PrimitiveSidebar } from './Sidebar';
export interface DashboardLayoutProps extends PropsWithChildren {}

const WorkspaceLayout: FC<DashboardLayoutProps> = () => {
  return (
    <ExplorerProvider>
      <Container p="0" fluid h="100dvh">
        <DividerPanel hideDividerCollapsed initial={278} min={208} max={608}>
          <DividerPanel.Leading>
            <PrimitiveSidebar />
          </DividerPanel.Leading>
          <DividerPanel.Trailing>
            <ScrollArea.Autosize
              h="100%"
              w="100%"
              mah="100%"
              scrollbars="y"
              scrollbarSize={10}
              type="hover"
              classNames={{
                scrollbar: styles.scrollbar,
                thumb: styles.scrollbarThumb,
                viewport: styles.viewport,
              }}
            >
              <Header />
              <PublishDocEditor />
            </ScrollArea.Autosize>
          </DividerPanel.Trailing>
        </DividerPanel>
      </Container>
    </ExplorerProvider>
  );
};

function Header() {
  const panel = useDividerPanel();

  const handleExpand = useCallback(() => {
    panel?.expand();
  }, [panel]);

  return (
    <Box
      pos="relative"
      component="nav"
      px={rem(18)}
      py="xs"
      h="55px"
      pl={0}
      style={{
        marginRight: rem(8),
        borderBottom: '1px solid var(--mantine-color-gray-2)',
      }}
    >
      {panel?.collapsed && (
        <Tooltip openDelay={2000} label="Collapse sidebar">
          <ActionIcon c="gray.7" onClick={handleExpand}>
            <IconLayoutSidebarLeftExpand size={22} />
          </ActionIcon>
        </Tooltip>
      )}
    </Box>
  );
}

export const Component = function () {
  return (
    <>
      <WorkspaceLayout>
        <Outlet />
      </WorkspaceLayout>
    </>
  );
};
