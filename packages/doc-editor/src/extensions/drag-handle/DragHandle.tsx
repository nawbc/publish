import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import type { FC } from 'react';

export const DragHandleComponent: FC = function () {
  return (
    <NodeViewWrapper className="drag-handle">
      <div
        className="drag-handle"
        contentEditable={false}
        draggable="true"
        data-drag-handle
      />
      <NodeViewContent />
    </NodeViewWrapper>
  );
};
