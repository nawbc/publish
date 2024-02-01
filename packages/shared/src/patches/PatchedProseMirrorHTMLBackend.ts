import { HTML5Backend } from 'react-dnd-html5-backend';

const shouldIgnoreTarget = (domNode: HTMLElement) => {
  if (domNode instanceof HTMLElement) {
    return domNode.closest('.ProseMirror');
  }
};

export const PatchedProseMirrorHTMLBackend = (...args) => {
  // @ts-ignore
  const instance = new HTML5Backend(...args);

  const listeners = [
    'handleTopDragStart',
    'handleTopDragStartCapture',
    'handleTopDragEndCapture',
    'handleTopDragEnter',
    'handleTopDragEnterCapture',
    'handleTopDragLeaveCapture',
    'handleTopDragOver',
    'handleTopDragOverCapture',
    'handleTopDrop',
    'handleTopDropCapture',
  ];
  listeners.forEach((name) => {
    const original = instance[name];
    instance[name] = (e, ...extraArgs) => {
      if (!shouldIgnoreTarget(e.target)) {
        original(e, ...extraArgs);
      }
    };
  });

  return instance;
};
