import { createContext } from 'react';

export const DividerPanelContext = createContext<{
  collapsed: boolean;
  expanded: boolean;
  collapse(): void;
  expand(): void;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);
