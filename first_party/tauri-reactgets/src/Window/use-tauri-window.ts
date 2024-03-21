import { useContext } from 'react';

import { TauriWindowContext } from './TauriWindowContext';

export const useNativeWindow = function () {
  return useContext(TauriWindowContext);
};
