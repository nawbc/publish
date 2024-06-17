import { use } from 'react';

import { TauriWindowContext } from './TauriWindowContext';

export const useNativeWindow = function () {
  return use(TauriWindowContext);
};
