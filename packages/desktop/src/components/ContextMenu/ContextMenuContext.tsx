import type React from 'react';
import { createContext, useContext } from 'react';

import type { ItemTracker } from './hooks';

export interface ContextMenuProviderProps {
  value: ItemTracker;
  children?: React.ReactNode;
}


const ContextMenuContext = createContext({} as ItemTracker);

export const useItemTrackerContext = () => useContext(ContextMenuContext);

export const ContextMenuProvider: React.FC<ContextMenuProviderProps> = (
  props,
) => <ContextMenuContext.Provider {...props} />;
