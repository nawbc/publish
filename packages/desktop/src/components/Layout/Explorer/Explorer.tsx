import { Box } from '@mantine/core';
import type { FC } from 'react';

import { ActionsBar } from './ActionsBar';
import { ExplorerTree } from './Tree';

export const Explorer: FC<any> = function () {
  return (
    <Box flex={1}>
      <ActionsBar />
      <ExplorerTree />
    </Box>
  );
};

Explorer.displayName = '@publish/desktop/Explorer';
