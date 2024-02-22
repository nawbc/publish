import { IconEdit } from '@tabler/icons-react';

import type { ItemParams } from '../ContextMenu';
import { ContextMenu } from '../ContextMenu';

export const EXPLORER_EMPTY_ID = 'publish:explorer_empty';

export const EXPLORER_NODE_ID = 'publish:explorer_node';

const { Sub, Item } = ContextMenu;

export function ExplorerEmptyContextMenu() {
  return (
    <ContextMenu id={EXPLORER_EMPTY_ID}>
      {/* <Menu.Label>Demo</Menu.Label> */}
      <Item>Demo2</Item>
    </ContextMenu>
  );
}

export function ExplorerNodeContextMenu() {
  function handleItemClick({ event, props, triggerEvent, data }: ItemParams) {
    console.log(event, props, triggerEvent, data);
  }

  return (
    <ContextMenu id={EXPLORER_NODE_ID}>
      {/* <Menu.Label>Demo</Menu.Label> */}
      <Item leading={<IconEdit size={16} />} onClick={handleItemClick}>
        Rename
      </Item>
      <Item>Demo2</Item>
      <Sub label="SubMenu121321">
        <Item>Demo2</Item>
        <Item>Demo2</Item>
        <Item>Demo2</Item>
        <Item color="red">Demo2</Item>
      </Sub>
    </ContextMenu>
  );
}
