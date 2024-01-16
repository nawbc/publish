import type { TreeMethods } from '@minoru/react-dnd-treeview';
import type { RefObject } from 'react';
import { createContext } from 'react';

export interface ExplorerContextProps {
  collapseAll(): void;
  expandAll(): void;
  toggle(): void;
  allCollapsed: boolean;
  _treeRef: RefObject<TreeMethods> | null;
}

export const ExplorerContext = createContext<ExplorerContextProps>({
  collapseAll() {},
  expandAll() {},
  toggle() {},
  allCollapsed: false,
  _treeRef: null,
});
