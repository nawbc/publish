import { ContextMenu, Submenu } from '../ContextMenu';
import { Menu } from '../ContextMenu/components/Menu';

export const FILE_MENU_ID = 'file:primitive';

export function FileContextMenu() {
  // function handleItemClick({ event, props, triggerEvent, data }: ItemParams) {
  //   console.log(event, props, triggerEvent, data);
  // }

  return (
    <ContextMenu id={FILE_MENU_ID}>
      <Menu.Label>Demo</Menu.Label>
      <Menu.Item>Demo2</Menu.Item>
      <Menu.Item>Demo2</Menu.Item>
      {/* <Item onClick={handleItemClick}>Sub Item 1</Item>
      <Item onClick={handleItemClick}>Delete</Item> */}

      <Submenu label="Submenu">
        <Menu.Item>Demo2</Menu.Item>
        <Menu.Item color="red">Demo2</Menu.Item>
        {/* <Item onClick={handleItemClick}>Sub Item 1</Item>
        <Item onClick={handleItemClick}>Delete</Item> */}
      </Submenu>
    </ContextMenu>
  );
}
