import { ActionIcon, Container, Flex, rem, Tooltip } from '@mantine/core';
import { PublishDocEditor } from '@publish/doc-editor/preset/index.ts';
import { IconLayoutSidebarRightExpand } from '@publish/shared';
import type { PropsWithChildren } from 'react';
import { type FC, useCallback } from 'react';
import { Outlet } from 'react-router';
import { useTauriOS } from 'tauri-reactgets';

import { ExplorerProvider } from '../Explorer';
import { WindowsNativeTitleBar } from '../NativeTitleBar/Windows';
import { ScrollView } from '../ScrollView';
import { DividerPanel, useDividerPanel } from './DividerPanel';
import { DraggableHeader } from './DraggableHeader';
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
  const os = useTauriOS();

  const handleExpand = useCallback(() => {
    panel?.expand();
  }, [panel]);

  return (
    <Flex
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-2)',
      }}
    >
      <DraggableHeader w="100%" mih={rem(40)} pos="relative">
        {panel?.collapsed && (
          <Tooltip openDelay={2000} label="Collapse sidebar">
            <ActionIcon c="gray.7" onClick={handleExpand}>
              <IconLayoutSidebarRightExpand />
            </ActionIcon>
          </Tooltip>
        )}
      </DraggableHeader>

      {os.type === 'windows' && <WindowsNativeTitleBar />}
    </Flex>
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
