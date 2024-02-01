import { ActionIcon, Flex, rem, Text } from '@mantine/core';
import type { NodeModel, RenderParams } from '@publishjs/react-dnd-treeview';
import { IconChevronRight } from '@tabler/icons-react';
import type { MouseEvent } from 'react';
import { type FC, useCallback, useEffect } from 'react';

import { EXPLORER_MENU_ID } from '~/components/context-menus';
import { useContextMenu } from '~/components/ContextMenu';

import { PolymorphicIcon } from './PolymorphicIcon';
import * as styles from './TreeNode.css';
import type { NodeData } from './types';

export interface TreeNodeProps extends RenderParams {
  node: NodeModel<NodeData>;
  isDragging: boolean;
  isSelected: boolean;
  onToggle(): void;
  onClick?: (e: MouseEvent<HTMLDivElement>, node: NodeModel<NodeData>) => void;
}

export const TreeNode: FC<TreeNodeProps> = (props) => {
  const {
    node,
    onClick,
    containerRef,
    onToggle,
    isSelected,
    isDragging,
    handleRef,
  } = props;
  const { id, droppable, data } = node;

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

  const handleClick = useCallback(
    (e) => {
      onToggle();
      onClick?.(e, node);
    },
    [node, onClick, onToggle],
  );

  useEffect(() => {
    if (isSelected) {
      containerRef.current?.classList.add(styles.selected);
    } else {
      containerRef.current?.classList.remove(styles.selected);
    }
  }, [containerRef, isSelected]);

  useEffect(() => {
    if (isDragging) {
      containerRef.current?.classList.add(styles.dragging);
    } else {
      containerRef.current?.classList.remove(styles.dragging);
    }
  }, [containerRef, isDragging]);

  return (
    <Flex
      ref={handleRef}
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
        pos="relative"
        top={rem(-1)}
      >
        {props.node.droppable && <IconChevronRight size={14} />}
      </ActionIcon>
      <PolymorphicIcon type={data?.type} />
      <Text pl={5} size="md" c="black" pos="relative" top={rem(1)}>
        {props.node.text}
      </Text>
    </Flex>
  );
};
