import { ContextMenu } from '../ContextMenu';

export const EXPLORER_MENU_ID = 'publish:explorer';

const { Sub, Item } = ContextMenu;

export function FileContextMenu() {
  // function handleItemClick({ event, props, triggerEvent, data }: ItemParams) {
  //   console.log(event, props, triggerEvent, data);
  // }

  return (
    <ContextMenu id={EXPLORER_MENU_ID}>
      {/* <Menu.Label>Demo</Menu.Label> */}
      <Item>Demo2</Item>
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
