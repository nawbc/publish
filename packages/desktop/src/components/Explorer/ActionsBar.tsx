import { ActionIcon, Flex, Group, rem } from '@mantine/core';
import { IconArrowAutofitHeight, IconFolderPlus } from '@tabler/icons-react';
import type { FC } from 'react';

import { useExplorer } from './hooks';

export const ActionsBar: FC<any> = function () {
  const explorer = useExplorer();
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
          c="gray.7"
          onClick={() => {
            explorer.toggle();
          }}
        >
          <IconFolderPlus size={18} />
        </ActionIcon>
        <ActionIcon
          size="md"
          c="gray.7"
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
