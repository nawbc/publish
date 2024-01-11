import { createScope, molecule } from 'bunshi/react';
import { atom } from 'jotai';

export type TreeNodeScope = {
  renamed: boolean;
};

export const TreeNodeScope = createScope<TreeNodeScope>({
  renamed: false,
});

export const TreeNodeMolecule = molecule((_, scope) => {
  const { renamed } = scope(TreeNodeScope);
  const renameAtom = atom(renamed);

  return {
    renameAtom,
  };
});
