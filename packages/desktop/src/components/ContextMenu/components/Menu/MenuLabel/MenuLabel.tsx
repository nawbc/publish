import type {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  Factory,
} from '@mantine/core';
import { Box, factory, useProps } from '@mantine/core';

import type { TriggerEvent } from '../../../types';
import { useMenuContext } from '../Menu.context';
import classes from '../Menu.module.css';

export type MenuLabelStylesNames = 'label';

export interface MenuLabelProps
  extends BoxProps,
    CompoundStylesApiProps<MenuLabelFactory>,
    ElementProps<'div'> {
  triggerEvent?: TriggerEvent;
}

export type MenuLabelFactory = Factory<{
  props: MenuLabelProps;
  ref: HTMLDivElement;
  stylesNames: MenuLabelStylesNames;
  compound: true;
}>;

const defaultProps: Partial<MenuLabelProps> = {};

export const MenuLabel = factory<MenuLabelFactory>((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars: _vars,
    triggerEvent: _triggerEvent,
    ...others
  } = useProps('MenuLabel', defaultProps, props);
  const ctx = useMenuContext();

  return (
    <Box
      ref={ref}
      {...ctx.getStyles('label', { className, style, styles, classNames })}
      {...others}
    />
  );
});

MenuLabel.classes = classes;
MenuLabel.displayName = '@publish/desktop/ContextMenuLabel';
