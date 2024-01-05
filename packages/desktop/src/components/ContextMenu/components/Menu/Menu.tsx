import type { ExtendComponent } from '@mantine/core';
import {
  Box,
  type Factory,
  getContextItemIndex,
  type StylesApiProps,
  useHovered,
  useProps,
  useStyles,
} from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';
import type React from 'react';

import { MenuContextProvider } from './Menu.context';
import classes from './Menu.module.css';
import { MenuDivider } from './MenuDivider/MenuDivider';
import { MenuDropdown } from './MenuDropdown/MenuDropdown';
import { MenuItem } from './MenuItem/MenuItem';
import { MenuLabel } from './MenuLabel/MenuLabel';

export type MenuStylesNames =
  | 'item'
  | 'itemLabel'
  | 'itemSection'
  | 'label'
  | 'divider';

export type MenuFactory = Factory<{
  props: MenuProps;
  ref: HTMLDivElement;
  stylesNames: MenuStylesNames;
}>;

export interface MenuProps extends StylesApiProps<MenuFactory> {
  variant?: string;

  /** Menu content */
  children?: React.ReactNode;

  /** Determines whether arrow key presses should loop though items (first to last and last to first) */
  loop?: boolean;

  /** Determines whether dropdown should be closed when Escape key is pressed, defaults to true */
  closeOnEscape?: boolean;

  /** id base to create accessibility connections */
  id?: string;
}

const defaultProps: Partial<MenuProps> = {
  loop: true,
};

export function Menu(_props: MenuProps) {
  const props = useProps('Menu', defaultProps, _props);
  const {
    children,
    loop,
    classNames,
    styles,
    unstyled,
    variant,
    vars: _vars,
    ...others
  } = props;

  const getStyles = useStyles<MenuFactory>({
    name: 'Menu',
    classes,
    props,
    classNames,
    styles,
    unstyled,
  });

  const [hovered, { setHovered, resetHovered }] = useHovered();

  const getItemIndex = (node: HTMLButtonElement) =>
    getContextItemIndex('[data-menu-item]', '[data-menu-dropdown]', node);

  useDidUpdate(() => {
    resetHovered();
  }, []);

  return (
    <MenuContextProvider
      value={{
        getStyles,
        getItemIndex,
        hovered,
        setHovered,
        loop,
        unstyled,
      }}
    >
      <Box {...others} variant={variant}>
        {children}
      </Box>
    </MenuContextProvider>
  );
}

Menu.extend = (input: ExtendComponent<MenuFactory>) => input;
Menu.classes = classes as Record<string, string>;
Menu.displayName = '@mantine/core/Menu';
Menu.Item = MenuItem;
Menu.Label = MenuLabel;
Menu.Dropdown = MenuDropdown;
Menu.Divider = MenuDivider;
