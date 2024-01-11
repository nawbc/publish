import { useMolecule } from 'bunshi/react';
import { forwardRef, useRef } from 'react';

import { WorkspaceMolecule } from './editor.molecule';

export const Editor = forwardRef(function () {
  const { modeAtom } = useMolecule(WorkspaceMolecule);
  const ref = useRef<HTMLDivElement>(null);

  if (ref.current && ref.current.childNodes.length === 0) {
    // ref.current.appendChild(editor);
  }

  return <div ref={ref} id="editor-container" />;
});

Editor.displayName = '@publish/desktop/Editor';
