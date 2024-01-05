import { Button, Container } from '@mantine/core';
import type { PropsWithChildren } from 'react';
import { type FC } from 'react';
import { Outlet } from 'react-router';

import { useContextMenu } from '../ContextMenu';
import { FILE_MENU_ID } from '../contextmenus';
import { PrimitiveSidebar } from './Sidebar';
import { SplitPanel, useSplitPanel } from './SplitPanel';
export interface DashboardLayoutProps extends PropsWithChildren {}

const WorkspaceLayout: FC<DashboardLayoutProps> = () => {
  return (
    <Container p="0" fluid h="100dvh">
      <SplitPanel hideDividerWhenCollapsed initial={278} min={208} max={608}>
        <SplitPanel.Left>
          <PrimitiveSidebar />
        </SplitPanel.Left>
        <SplitPanel.Right>
          <Demo />
        </SplitPanel.Right>
      </SplitPanel>
    </Container>
  );
};

function Demo() {
  const panel = useSplitPanel();
  const { show } = useContextMenu({
    id: FILE_MENU_ID,
  });

  return (
    <>
      {panel?.collapsed ? 'demo' : 'right'}
      <Button
        onClick={() => {
          panel?.expand();
          // console.log(panel, '---');
        }}
        onContextMenu={(e) => {
          console.log(e);
          show({ event: e });
        }}
      />
    </>
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
