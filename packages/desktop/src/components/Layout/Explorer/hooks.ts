import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';

import { TreeNodeMolecule } from './tree-node.molecule';

export const useExplorer = function () {
  const { renameAtom } = useMolecule(TreeNodeMolecule);
  const [_, rename] = useAtom(renameAtom);

  return { rename };
};
