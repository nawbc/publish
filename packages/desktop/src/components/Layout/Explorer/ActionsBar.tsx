import { ActionIcon, Flex, Group, rem } from '@mantine/core';
import { IconArrowAutofitHeight, IconFolderPlus } from '@tabler/icons-react';
import type { FC } from 'react';

import { useExplorerContext } from './hooks';

export const ActionsBar: FC<any> = function () {
  const explorer = useExplorerContext();
  return (
    <Flex
      align="center"
      pos="relative"
      justify="flex-end"
      component="nav"
      px={rem(18)}
    >
      <Group gap="xs">
        <ActionIcon
          size="md"
          variant="subtle"
          onClick={() => {
            explorer.toggle();
          }}
        >
          <IconFolderPlus size={18} />
        </ActionIcon>
        <ActionIcon
          size="md"
          variant="subtle"
          onClick={() => {
            explorer.toggle();
          }}
        >
          <IconArrowAutofitHeight size={18} />
        </ActionIcon>
      </Group>
    </Flex>
  );
};
