import { useContext, useRef } from 'react';

import { ContextMenuContext } from '../ContextMenuContext';

export interface ItemTrackerRecord {
  node: HTMLElement;
  isSubMenu: boolean;
  subMenuRefTracker?: ItemTracker;
  setSubMenuPosition?: () => void;
  keyMatcher?: false | ((e: KeyboardEvent) => void);
}

export type ItemTracker = ReturnType<typeof useItemTracker>;

export const useItemTracker = () =>
  useRef<Map<HTMLElement, ItemTrackerRecord>>(new Map()).current;

export const useItemTrackerContext = () => useContext(ContextMenuContext);
