import { Badge } from '@mantine/core';
import type { DragItem, NodeModel } from '@publish-kit/react-dnd-treeview';
import { type FC, useMemo } from 'react';

import { PolymorphicIcon } from './PolymorphicIcon';
import type { NodeData } from './types';

export interface SingleDragPreviewProps {
  sources: NodeModel<NodeData>[];
}

export const MultipleDragPreview: FC<SingleDragPreviewProps> = (props) => {
  const { sources } = props;
  const color = 'gray';
  const items = useMemo(
    () => (sources.length > 5 ? sources.slice(0, 5) : sources),
    [sources],
  );

  const showcases = Array.prototype.map.call(
    items,
    (item: DragItem<NodeData>) => {
      return (
        <Badge
          key={item.text}
          radius="xs"
          color={color}
          variant="light"
          tt="none"
          fw="normal"
          leftSection={<PolymorphicIcon c={color} type={item.data?.type} />}
        >
          {item.text}
        </Badge>
      );
    },
  );

  return <>{showcases}</>;
};
