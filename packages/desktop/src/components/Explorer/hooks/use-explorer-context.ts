import { useContext } from 'react';

import { ExplorerContext } from '../ExplorerContext';

export const useExplorer = function () {
  return useContext(ExplorerContext);
};
