import type { TreeMethods } from '@publishjs/react-dnd-treeview';
import type { RefObject } from 'react';
import { createContext } from 'react';

export interface ExplorerNode {
  rename(id: number, name: string): void;
}

export interface ExplorerContextProps {
  collapseAll(): void;
  expandAll(): void;
  toggle(): void;
  allCollapsed: boolean;
  node: ExplorerNode;
  treeRef: RefObject<TreeMethods> | null;
}

export const ExplorerContext = createContext<ExplorerContextProps>({
  collapseAll() {},
  expandAll() {},
  toggle() {},
  node: { rename() {} },
  allCollapsed: false,
  treeRef: null,
});
