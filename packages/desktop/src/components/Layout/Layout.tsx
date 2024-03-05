import { ActionIcon, Box, Container, rem, Tooltip } from '@mantine/core';
// import worker from '@publish/addon-rt/guard/index.js';
import { PublishDocEditor } from '@publish/doc-editor/preset/index.ts';
import { createTransport, IndexedDBTransport, Logger } from '@publish/logger';
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import type { PropsWithChildren } from 'react';
import { type FC, useCallback } from 'react';
import { Outlet } from 'react-router';

import { ExplorerProvider } from '../Explorer';
import { ScrollView } from '../ScrollView';
import { DividerPanel, useDividerPanel } from './DividerPanel';
import { PrimitiveSidebar } from './Sidebar';
export interface DashboardLayoutProps extends PropsWithChildren {}

const logger = Logger.create({
  transports: [createTransport(IndexedDBTransport)],
});

const WorkspaceLayout: FC<DashboardLayoutProps> = () => {
  return (
    <ExplorerProvider>
      <Container p="0" fluid h="100dvh">
        <DividerPanel hideDividerCollapsed initial={278} min={208} max={608}>
          <DividerPanel.Leading>
            <PrimitiveSidebar />
          </DividerPanel.Leading>
          <DividerPanel.Trailing>
            <ScrollView>
              <Header />
              <PublishDocEditor />
            </ScrollView>
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
      <button
        onClick={() => {
          console.log(logger);
          logger.info('test');
        }}
      >
        Test local log
      </button>
      <button
        onClick={async () => {
          // console.log(worker);
          // navigator.serviceWorker.register(worker, {
          //   scope: '/',
          // });
        }}
      >
        worker
      </button>
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
