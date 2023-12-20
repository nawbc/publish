import { AppShell, Burger } from '@mantine/core';
import { useAtom } from 'jotai';
import type { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Fallback } from '../Fallback';
import { navbarCollapseAtom } from './navbar.atom';
// import { SkeletonList } from '~/components/Skeletons';
import { NavMenu } from './NavMenu';

export interface AppShellDrawerProps {
  semver?: string;
}

export const AppShellDrawer: FC<AppShellDrawerProps> = function (_props) {
  const [opened, toggle] = useAtom(navbarCollapseAtom);

  return (
    <AppShell.Navbar p="md">
      <ErrorBoundary fallbackRender={Fallback}>
        <Burger
          opened={opened.mobile}
          onClick={() => toggle({ ...opened, mobile: !opened.mobile })}
          hiddenFrom="sm"
          size="xs"
        />
        {/* <SkeletonList /> */}
        <NavMenu mt={20} />
      </ErrorBoundary>
    </AppShell.Navbar>
  );
};
