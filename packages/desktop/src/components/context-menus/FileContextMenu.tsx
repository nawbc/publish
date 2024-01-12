import { ContextMenu, MenuItem, SubMenu } from '../ContextMenu';

export const EXPLORER_MENU_ID = 'publish:explorer';

export function FileContextMenu() {
  // function handleItemClick({ event, props, triggerEvent, data }: ItemParams) {
  //   console.log(event, props, triggerEvent, data);
  // }

  return (
    <ContextMenu id={EXPLORER_MENU_ID}>
      {/* <Menu.Label>Demo</Menu.Label> */}
      <MenuItem>Demo2</MenuItem>
      <MenuItem>Demo2</MenuItem>
      <SubMenu label="SubMenu121321">
        <MenuItem>Demo2</MenuItem>
        <MenuItem>Demo2</MenuItem>
        <MenuItem>Demo2</MenuItem>
        <MenuItem color="red">Demo2</MenuItem>
      </SubMenu>
      {/* <SubMenu
        disabled
        label="SubMenu21111111111111111111111111121111111111111111111111111"
      >
        <MenuItem>Demo2</MenuItem>
        <MenuItem color="red">Demo2</MenuItem>
        <SubMenu disabled label="SubMenu1">
          <MenuItem>Demo2</MenuItem>
          <MenuItem color="red">Demo2</MenuItem>
        </SubMenu>
      </SubMenu> */}
    </ContextMenu>
  );
}
