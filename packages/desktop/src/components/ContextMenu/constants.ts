/*
 * css classes mapping
 * */
// export const enum CssClass {
//   menu = 'contexify',
//   submenu = 'contextmenu_submenu',
//   submenuOpen = 'contextmenu_submenu-isOpen',
//   rightSlot = 'contextmenu_rightSlot',
//   separator = 'contextmenu_separator',
//   item = 'contextmenu_item',
//   itemDisabled = 'contextmenu_item-disabled',
//   itemContent = 'contextmenu_itemContent',
//   itemClickedFeedback = 'contextmenu_item-feedback',
//   theme = 'contextmenu_theme-',
//   animationWillEnter = 'contextmenu_willEnter-',
//   animationWillLeave = 'contextmenu_willLeave-',
// }

export const enum EVENT {
  HIDE_ALL,
}

export const NOOP = () => {};

export const hideOnEvents: (keyof GlobalEventHandlersEventMap)[] = [
  'resize',
  'contextmenu',
  'click',
  'scroll',

  // comment blur in dev so you can toggle console without closing the menu
  'blur',
];
