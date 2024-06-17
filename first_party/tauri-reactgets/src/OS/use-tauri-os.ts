import { use } from 'react';

import { TauriOSContext } from './TauriOSContext';

export const useTauriOS = function () {
  return use(TauriOSContext);
};
