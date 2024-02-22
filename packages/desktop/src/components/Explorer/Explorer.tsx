import { Box, Flex } from '@mantine/core';
import type { MouseEvent } from 'react';
import { type FC, useCallback } from 'react';

import { EXPLORER_EMPTY_ID } from '../context-menus';
import { useContextMenu } from '../ContextMenu';
import { ActionsBar } from './ActionsBar';
import { ExplorerTree } from './Tree';

export const Explorer: FC<any> = function () {
  const { show } = useContextMenu({
    id: EXPLORER_EMPTY_ID,
  });

  const showMenu = useCallback(
    (e: MouseEvent) => {
      show({ event: e });
    },
    [show],
  );

  return (
    <Box flex={1}>
      <Flex direction="column" h="100%">
        <ActionsBar />
        <ExplorerTree />
        <Box flex={1} onContextMenu={showMenu} />
      </Flex>
    </Box>
  );
};

Explorer.displayName = '@publish/desktop/Explorer';
