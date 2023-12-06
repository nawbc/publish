import { createScope, molecule } from 'bunshi/react';
import { atom } from 'jotai';
export type EditorMode = 'page' | 'edgeless';

export type WorkspaceScope = {
  workspace: string | null;
  page: string | null;
  mode: EditorMode;
};

export const WorkspaceScope = createScope<WorkspaceScope>({
  workspace: null,
  page: null,
  mode: 'page',
});

export const workspaceMolecule = molecule((mol, scope) => {
  const { workspace, page, mode } = scope(WorkspaceScope);
  const modeAtom = atom<EditorMode>(mode);

  return {
    modeAtom,
  };
});
