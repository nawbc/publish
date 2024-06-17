import { use } from 'react';

import { TreeContext } from '../providers';
import type { TreeState } from '../types';

export const useTreeContext = <T>(): TreeState<T> => {
  const treeContext = use<TreeState<T>>(
    TreeContext as unknown as React.Context<TreeState<T>>,
  );

  if (!treeContext) {
    throw new Error('useTreeContext must be used under TreeProvider');
  }

  return treeContext;
};
