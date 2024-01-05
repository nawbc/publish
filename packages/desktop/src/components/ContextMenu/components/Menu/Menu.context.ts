import { createSafeContext, type GetStylesApi } from '@mantine/core';

import type { MenuFactory } from './Menu';

interface MenuContext {
  getItemIndex: (node: HTMLButtonElement) => number | null;
  setHovered: (index: number | null) => void;
  hovered: number | null;
  loop: boolean | undefined;
  unstyled: boolean | undefined;
  getStyles: GetStylesApi<MenuFactory>;
}

export const [MenuContextProvider, useMenuContext] =
  createSafeContext<MenuContext>('Menu component was not found in the tree');
