import { useContext } from 'react';

import { NativeWindowContext } from './NativeWindowContext';

export const useNativeWindow = function () {
  return useContext(NativeWindowContext);
};
