import { ActionIcon, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

import styles from './b.module.css';
import { PolymorphicIcon } from './PolymorphicIcon';

export const TreeNode = ({ testIdPrefix = '', ...props }) => {
  const { id, droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleClick = (e) => {
    // props.onClick(e, props.node);
    console.log(e);
    props.onToggle();
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle();
  };

  if (props.isSelected) {
    props.containerRef.current?.classList.add(styles.selected);
  } else {
    props.containerRef.current?.classList.remove(styles.selected);
  }

  if (props.isDragging) {
    props.containerRef.current?.classList.add(styles.dragging);
  } else {
    props.containerRef.current?.classList.remove(styles.dragging);
  }

  console.log(data);
  return (
    <div
      className={styles.root}
      style={{ paddingInlineStart: 8 }}
      onClick={handleClick}
    >
      {props.node.droppable && (
        <ActionIcon
          size={16}
          c="gray"
          variant="transparent"
          aria-label="Folder collapse arrow"
        >
          <IconChevronRight />
        </ActionIcon>
      )}
      <PolymorphicIcon type={data?.fileType} />
      <Text size="sm" c="black">
        {props.node.text}
      </Text>
    </div>
  );
};
