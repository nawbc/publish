import { useContext } from 'react';

import { ExplorerContext } from '../ExplorerContext';

export const useExplorerContext = function () {
  return useContext(ExplorerContext);
};
