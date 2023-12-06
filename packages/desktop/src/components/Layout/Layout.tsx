import { FC } from 'react';
import { AppShell, rem } from '@mantine/core';
// import { ErrorBoundary } from 'react-error-boundary';
import { useAtom } from 'jotai';
import { navbarCollapseAtom } from './navbar.atom';
import { AppShellDrawer } from './Drawer';
import { Outlet } from 'react-router-dom';

export interface DashboardLayoutProps {}

const DashboardLayout: FC<DashboardLayoutProps> = () => {
  const [opened] = useAtom(navbarCollapseAtom);
  console.debug('color:green');

  return (
    <AppShell
      layout="alt"
      header={{ height: rem(65) }}
      navbar={{
        width: rem(300),
        breakpoint: 'sm',
        collapsed: { mobile: !opened.mobile, desktop: !opened.desktop },
      }}
      padding={{ base: 'md', lg: 0 }}
    >
      <AppShellDrawer />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export const Component = function () {
  return (
    <>
      <DashboardLayout />
    </>
  );
};
