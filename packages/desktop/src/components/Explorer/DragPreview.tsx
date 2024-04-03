import type {
  DragLayerMonitorProps,
  NodeModel,
} from '@publish-kit/react-dnd-treeview';
import { type FC } from 'react';

import { MultipleDragPreview } from './MultipleDragPreview';
import { SingleDragPreview } from './SingleDragPreview';
import type { NodeData } from './types';

export interface DragPreviewProps extends DragLayerMonitorProps<NodeData> {
  nodes: NodeModel<NodeData>[];
}

export const DragPreview: FC<DragPreviewProps> = (props) => {
  const { nodes, ...monitorProps } = props;

  if (nodes.length > 1) {
    return <MultipleDragPreview sources={nodes} />;
  }

  return <SingleDragPreview {...monitorProps} />;
};
