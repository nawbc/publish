import { ActionIcon, Flex, rem, Tooltip } from '@mantine/core';
import { IconLayoutSidebarRightExpand } from '@tabler/icons-react';
import type { FC } from 'react';
import { useCallback } from 'react';
import { IF } from 'reactgets';
import { useTauriOS } from 'tauri-reactgets';

import { WindowsNativeTitleBar } from '../../NativeTitleBar';
import { useDividerPanel } from '../DividerPanel';
import { DraggableHeader } from '../DraggableHeader';

export interface GlobalHeaderProps {}

export const GlobalHeader: FC<GlobalHeaderProps> = () => {
  const panel = useDividerPanel();
  const os = useTauriOS();

  const handleExpand = useCallback(() => {
    panel?.expand();
  }, [panel]);

  return (
    <Flex
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-2)',
      }}
    >
      <DraggableHeader w="100%" mih={rem(40)} pos="relative">
        <IF is={panel?.collapsed}>
          <Tooltip openDelay={2000} label="Collapse sidebar">
            <ActionIcon c="gray.7" onClick={handleExpand}>
              <IconLayoutSidebarRightExpand />
            </ActionIcon>
          </Tooltip>
        </IF>
      </DraggableHeader>

      <IF is={os.type === 'windows'}>
        <WindowsNativeTitleBar />
      </IF>
    </Flex>
  );
};
