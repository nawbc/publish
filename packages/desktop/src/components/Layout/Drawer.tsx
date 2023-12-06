import { AppShell, Burger } from '@mantine/core';
import { useAtom } from 'jotai';
import { navbarCollapseAtom } from './navbar.atom';
import { FC } from 'react';
// import { SkeletonList } from '~/components/Skeletons';
import { NavMenu } from './NavMenu';
import { Fallback } from '../Fallback';
import { ErrorBoundary } from 'react-error-boundary';

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
