import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { DragHandleComponent } from './DragHandle';

export const DragHandle = Node.create({
  name: 'dragHandle',
  group: 'block',
  content: 'block+',
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'div[data-type="draggable-item"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'draggable-item' }),
      0,
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(DragHandleComponent);
  },
});
