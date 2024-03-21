import { useContext } from 'react';

import { TauriOSContext } from './TauriOSContext';

export const useTauriOS = function () {
  return useContext(TauriOSContext);
};
