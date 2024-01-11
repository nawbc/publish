import { ActionIcon, Flex, rem, Text } from '@mantine/core';
import type { NodeModel } from '@minoru/react-dnd-treeview';
import { IconChevronRight } from '@tabler/icons-react';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import type { MouseEvent } from 'react';
import { type FC, useCallback } from 'react';

import { useContextMenu } from '~/components/ContextMenu';
import { EXPLORER_MENU_ID } from '~/components/context-menus';

import { PolymorphicIcon } from './PolymorphicIcon';
import { TreeNodeMolecule } from './tree-node.molecule';
import type { NodeData } from './type';

export interface TreeNodeProps {
  node: NodeModel<NodeData>;
  isDragging: boolean;
  isSelected: boolean;
  onToggle(): void;
}

export const TreeNode: FC<TreeNodeProps> = (props) => {
  const { id, droppable, data } = props.node;
  const { renameAtom } = useMolecule(TreeNodeMolecule);
  const [renamed, rename] = useAtom(renameAtom);

  const { show } = useContextMenu({
    id: EXPLORER_MENU_ID,
    props,
  });
  const showMenu = useCallback(
    (e: MouseEvent) => {
      show({ event: e, props });
    },
    [props, show],
  );

  const handleClick = (e) => {
    // props.onClick(e, props.node);
    props.onToggle();
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle();
  };

  if (props.isSelected) {
    // props.containerRef.current?.classList.add(styles.selected);
  } else {
    // props.containerRef.current?.classList.remove(styles.selected);
  }

  if (props.isDragging) {
    // props.containerRef.current?.classList.add(styles.dragging);
  } else {
    // props.containerRef.current?.classList.remove(styles.dragging);
  }

  return (
    <Flex
      onContextMenu={showMenu}
      onClick={handleClick}
      mih={32}
      gap={0}
      align="center"
      direction="row"
      wrap="nowrap"
    >
      <ActionIcon
        size={16}
        c="gray"
        variant="transparent"
        aria-label="Folder collapse arrow"
      >
        {props.node.droppable && <IconChevronRight />}
      </ActionIcon>
      <PolymorphicIcon type={data?.type} />
      <Text pl={5} size="sm" c="black" pos="relative" top={rem(1)}>
        {props.node.text}
      </Text>
    </Flex>
  );
};
