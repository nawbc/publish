import type React from 'react';
import { createContext, useContext } from 'react';

import type { ItemTracker } from './hooks';

const Context = createContext({} as ItemTracker);

export const useItemTrackerContext = () => useContext(Context);

export interface ItemTrackerProviderProps {
  value: ItemTracker;
  children?: React.ReactNode;
}

export const ItemTrackerProvider: React.FC<ItemTrackerProviderProps> = (
  props,
) => <Context.Provider {...props} />;
