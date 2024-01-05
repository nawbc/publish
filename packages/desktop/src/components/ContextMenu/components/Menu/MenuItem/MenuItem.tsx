import type {
  BoxProps,
  CompoundStylesApiProps,
  MantineColor,
  PolymorphicFactory,
} from '@mantine/core';
import {
  createEventHandler,
  createScopedKeydownHandler,
  polymorphicFactory,
  UnstyledButton,
  useDirection,
  useMantineTheme,
  useProps,
} from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import { useRef } from 'react';

import type { TriggerEvent } from '../../../types';
import { useMenuContext } from '../Menu.context';
import classes from '../Menu.module.css';

export type MenuItemStylesNames = 'item' | 'itemLabel' | 'itemSection';

export interface MenuItemProps
  extends BoxProps,
    CompoundStylesApiProps<MenuItemFactory> {
  /** Item label */
  children?: React.ReactNode;

  /** Key of `theme.colors` or any valid CSS color */
  color?: MantineColor;

  /** Determines whether the menu should be closed when the item is clicked, overrides `closeOnItemClick` prop on the `Menu` component */
  closeMenuOnClick?: boolean;

  /** Section displayed on the left side of the label */
  leftSection?: React.ReactNode;

  /** Section displayed on the right side of the label */
  rightSection?: React.ReactNode;

  /** Disables item */
  disabled?: boolean;

  triggerEvent?: TriggerEvent;
}

export type MenuItemFactory = PolymorphicFactory<{
  props: MenuItemProps;
  defaultRef: HTMLButtonElement;
  defaultComponent: 'button';
  stylesNames: MenuItemStylesNames;
  compound: true;
}>;

const defaultProps: Partial<MenuItemProps> = {};

export const MenuItem = polymorphicFactory<MenuItemFactory>((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars: _vars,
    color,
    leftSection,
    rightSection,
    children,
    disabled,
    triggerEvent: _triggerEvent,
    ...others
  } = useProps('MenuItem', defaultProps, props);

  const ctx = useMenuContext();
  const theme = useMantineTheme();
  const { dir } = useDirection();
  const itemRef = useRef<HTMLButtonElement>();
  const itemIndex = ctx.getItemIndex(itemRef.current!);
  const _others: any = others;

  const handleMouseLeave = createEventHandler(_others.onMouseLeave, () =>
    ctx.setHovered(-1),
  );
  const handleMouseEnter = createEventHandler(_others.onMouseEnter, () =>
    ctx.setHovered(ctx.getItemIndex(itemRef.current!)),
  );

  const handleClick = createEventHandler(_others.onClick, () => {});

  const handleFocus = createEventHandler(_others.onFocus, () =>
    ctx.setHovered(ctx.getItemIndex(itemRef.current!)),
  );

  const colors = color
    ? theme.variantColorResolver({ color, theme, variant: 'light' })
    : undefined;

  return (
    <UnstyledButton
      {...others}
      unstyled={ctx.unstyled}
      tabIndex={-1}
      onFocus={handleFocus}
      {...ctx.getStyles('item', { className, style, styles, classNames })}
      ref={useMergedRef(itemRef, ref)}
      role="menuitem"
      disabled={disabled}
      data-menu-item
      data-disabled={disabled || undefined}
      data-hovered={ctx.hovered === itemIndex ? true : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={createScopedKeydownHandler({
        siblingSelector: '[data-menu-item]',
        parentSelector: '[data-menu-dropdown]',
        activateOnFocus: false,
        loop: ctx.loop,
        dir,
        orientation: 'vertical',
        onKeyDown: _others.onKeydown,
      })}
      __vars={{
        '--menu-item-color': colors?.color,
        '--menu-item-hover': colors?.hover,
      }}
    >
      {leftSection && (
        <div
          {...ctx.getStyles('itemSection', { styles, classNames })}
          data-position="left"
        >
          {leftSection}
        </div>
      )}
      {children && (
        <div {...ctx.getStyles('itemLabel', { styles, classNames })}>
          {children}
        </div>
      )}
      {rightSection && (
        <div
          {...ctx.getStyles('itemSection', { styles, classNames })}
          data-position="right"
        >
          {rightSection}
        </div>
      )}
    </UnstyledButton>
  );
});

MenuItem.classes = classes;
MenuItem.displayName = '@publish/desktop/ContextMenuItem';
