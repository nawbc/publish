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
            <ScrollArea
              h="100%"
              w="100%"
              scrollbarSize={10}
              type="always"
              classNames={{
                scrollbar: styles.scrollbar,
                thumb: styles.scrollbarThumb,
                viewport: styles.viewport,
              }}
            >
              <Header />
              <PublishDocEditor />
            </ScrollArea>
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
    panel?.collapsed && (
      <Box pos="relative" component="nav" px={rem(18)} py="xs" pl={0}>
        <Tooltip openDelay={2000} label="Collapse sidebar">
          <ActionIcon c="gray" onClick={handleExpand}>
            <IconLayoutSidebarLeftExpand />
          </ActionIcon>
        </Tooltip>
      </Box>
    )
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
