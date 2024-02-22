import {
  ExplorerEmptyContextMenu,
  ExplorerNodeContextMenu,
} from './ExplorerContextMenu';

export function GlobalContextMenus() {
  return (
    <>
      <ExplorerEmptyContextMenu />
      <ExplorerNodeContextMenu />
    </>
  );
}
