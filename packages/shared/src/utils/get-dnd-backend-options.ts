import type { MultiBackendOptions } from 'dnd-multi-backend';
import { PointerTransition, TouchTransition } from 'dnd-multi-backend';
import { type HTML5BackendOptions } from 'react-dnd-html5-backend';
import type { TouchBackendOptions } from 'react-dnd-touch-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { PatchedProseMirrorHTMLBackend } from '../patches/PatchedProseMirrorHTMLBackend';

/**
 * A workaround fix. ProseMirror conflicts with react-dnd-html5-backend.
 *
 * {@link https://github.com/react-dnd/react-dnd-html5-backend/issues/7}
 */
// TODO: Improve react-dnd-html5-backend in react-dnd-treeview.
export const getDndBackendOptions = (
  options: {
    html5?: Partial<HTML5BackendOptions>;
    touch?: Partial<TouchBackendOptions>;
  } = {},
): MultiBackendOptions => {
  return {
    backends: [
      {
        id: 'html5',
        backend: PatchedProseMirrorHTMLBackend,
        options: options.html5,
        transition: PointerTransition,
      },
      {
        id: 'touch',
        backend: TouchBackend,
        options: options.touch || { enableMouseEvents: true },
        preview: true,
        transition: TouchTransition,
      },
    ],
  };
};
