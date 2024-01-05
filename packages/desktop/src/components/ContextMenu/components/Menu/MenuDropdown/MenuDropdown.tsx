import type {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  Factory,
} from '@mantine/core';
import { Box, factory, useProps } from '@mantine/core';
import type React from 'react';
import { useRef } from 'react';

import classes from '../Menu.module.css';

export type MenuDropdownStylesNames = 'dropdown';
export type MenuDropdownFactory = Factory<{
  props: MenuDropdownProps;
  ref: HTMLDivElement;
  stylesNames: MenuDropdownStylesNames;
  compound: true;
}>;

export interface MenuDropdownProps
  extends BoxProps,
    CompoundStylesApiProps<MenuDropdownFactory>,
    ElementProps<'div'> {}

const defaultProps: Partial<MenuDropdownProps> = {};

export const MenuDropdown = factory<MenuDropdownFactory>((props, ref) => {
  const {
    vars: _vars,
    onMouseEnter,
    onMouseLeave,
    children,
    ...others
  } = useProps('MenuDropdown', defaultProps, props);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      wrapperRef.current
        ?.querySelectorAll<HTMLButtonElement>(
          '[data-menu-item]:not(:disabled)',
        )[0]
        ?.focus();
    }
  };

  return (
    <Box
      {...others}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menu"
      aria-orientation="vertical"
      ref={ref}
    >
      <div
        tabIndex={-1}
        data-menu-dropdown
        data-autofocus
        onKeyDown={handleKeyDown}
        ref={wrapperRef}
        style={{ outline: 0 }}
      >
        {children}
      </div>
    </Box>
  );
});

MenuDropdown.classes = classes;
MenuDropdown.displayName = 'ContextMenuDropdown';
