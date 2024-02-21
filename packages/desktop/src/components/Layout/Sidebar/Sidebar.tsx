import { Flex } from '@mantine/core';
import { type FC } from 'react';

import { PublishErrorBoundary } from '../../Fallback';
import { Explorer } from '../Explorer';
import { SidebarHeader } from './Header';

export interface PrimitiveSidebarProps {
  semver?: string;
}

export const PrimitiveSidebar: FC<PrimitiveSidebarProps> = function (_props) {
  return (
    <PublishErrorBoundary>
      <Flex direction="column" h="100%">
        <SidebarHeader />
        <Explorer />
      </Flex>
    </PublishErrorBoundary>
  );
};
