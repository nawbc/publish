import {
  ActionIcon,
  Flex,
  rem,
  Text,
  Transition,
  UnstyledButton,
} from '@mantine/core';
import { useClickOutside, useMergedRef } from '@mantine/hooks';
import type { NodeModel, RenderParams } from '@publishjs/react-dnd-treeview';
import { IconChevronRight } from '@tabler/icons-react';
import { clsx } from 'clsx';
import type { MouseEvent } from 'react';
import { type FC, useCallback, useEffect } from 'react';

import { EXPLORER_NODE_ID } from '../../context-menus';
import { useContextMenu } from '../../ContextMenu';
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
  const { node, onClick, onToggle, isSelected, isDragging, isOpen, handleRef } =
    props;

  const { id, droppable, data } = node;
  // const useClickOutsideRef = useClickOutside(() => {
  //   handleRef.current?.classList.remove(styles.selected);
  // });
  // const mergedRef = useMergedRef(useClickOutsideRef, handleRef);

  const { show } = useContextMenu({
    id: EXPLORER_NODE_ID,
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
      handleRef.current?.classList.add(styles.selected);
    } else {
      handleRef.current?.classList.remove(styles.selected);
    }
  }, [handleRef, isSelected]);

  useEffect(() => {
    if (isDragging) {
      handleRef.current?.classList.add(styles.dragging);
    } else {
      handleRef.current?.classList.remove(styles.dragging);
    }
  }, [handleRef, isDragging]);

  return (
    <UnstyledButton
      className={styles.node}
      ref={handleRef}
      onContextMenu={showMenu}
      onClick={handleClick}
      mih={32}
      w="100%"
      title={node.text}
    >
      <ActionIcon
        component="div"
        className={clsx(
          droppable && {
            [styles.chevron.down]: isOpen,
            [styles.chevron.right]: !isOpen,
          },
        )}
        size={17}
        c="gray"
        variant="transparent"
        aria-label="Folder collapse arrow"
      >
        {droppable && <IconChevronRight size={14} />}
      </ActionIcon>

      <PolymorphicIcon type={data?.type} />
      <Text pl={5} size="sm" c="black" pos="relative" top={rem(1)}>
        {node.text}
      </Text>
    </UnstyledButton>
  );
};
