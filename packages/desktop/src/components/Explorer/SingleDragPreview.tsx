import { Badge } from '@mantine/core';
import type { DragLayerMonitorProps } from '@publishjs/react-dnd-treeview';
import type { FC } from 'react';

import { PolymorphicIcon } from './PolymorphicIcon';
import type { NodeData } from './types';

export interface SingleDragPreviewProps
  extends DragLayerMonitorProps<NodeData> {}

export const SingleDragPreview: FC<SingleDragPreviewProps> = (props) => {
  const { item } = props;
  const color = 'gray';

  return (
    <Badge
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
};
