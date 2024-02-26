import { rem } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

import type { ItemParams } from '../ContextMenu';
import { ContextMenu } from '../ContextMenu';
import type { TreeNodeProps } from '../Explorer/TreeNode';

export const EXPLORER_EMPTY_ID = 'publish:explorer_empty';

export const EXPLORER_NODE_ID = 'publish:explorer_node';

const { /* Sub, */ Item } = ContextMenu;

export function ExplorerEmptyContextMenu() {
  return (
    <ContextMenu id={EXPLORER_EMPTY_ID}>
      {/* <Menu.Label>Demo</Menu.Label> */}
      <Item>Demo2</Item>
      <Item>Demo2</Item>
      <Item>Demo2</Item>
      <Item>Demo2</Item>
      <Item>Demo2</Item>
    </ContextMenu>
  );
}

export interface ExplorerNodeContextMenu extends TreeNodeProps {
  rename(): void;
}

export function ExplorerNodeContextMenu() {
  // const explorer = useExplorer();

  const handleItemClick = function ({
    id,
    props,
  }: ItemParams<ExplorerNodeContextMenu, any>) {
    console.log(props);

    if (!props) return;

    switch (id) {
      case 'rename':
        props.rename();
        break;

      default:
        break;
    }

    // explorer.node.rename();
  };

  return (
    <ContextMenu style={{ minWidth: rem(230) }} id={EXPLORER_NODE_ID}>
      {/* <Menu.Label>Demo</Menu.Label> */}
      <Item
        id="rename"
        leading={<IconEdit size={16} />}
        onClick={handleItemClick}
      >
        Rename
      </Item>
      <Item id="copy">Copy</Item>
      <Item id="delete" color="red">
        Delete
      </Item>
    </ContextMenu>
  );
}
