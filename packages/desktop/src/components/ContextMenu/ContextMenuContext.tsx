import type React from 'react';
import { createContext } from 'react';

import type { ItemTracker } from './hooks';

export interface ContextMenuProviderProps {
  value: ItemTracker;
  children?: React.ReactNode;
}

export const ContextMenuContext = createContext({} as ItemTracker);

export const ContextMenuProvider: React.FC<ContextMenuProviderProps> = (
  props,
) => <ContextMenuContext {...props} />;
