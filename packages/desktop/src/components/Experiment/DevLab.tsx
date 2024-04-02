import { ActionIcon, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFlask } from '@tabler/icons-react';
import { type FC } from 'react';

import { DevExperiment } from './DevExperiment';

export interface DevLabProps {}

export const DevLab: FC<DevLabProps> = function () {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    kDevMode && (
      <>
        <Drawer
          position="top"
          offset={8}
          radius="md"
          title="Development lab"
          opened={opened}
          onClose={close}
          size="100%"
        >
          <DevExperiment />
        </Drawer>

        <ActionIcon
          radius="xl"
          size="xl"
          variant="light"
          aria-label="Lab"
          onClick={open}
          pos="fixed"
          color="blue"
          style={{ bottom: 10, right: 100, zIndex: 99999 }}
        >
          <IconFlask style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
      </>
    )
  );
};

DevLab.displayName = '@publish/desktop/DevLab';
