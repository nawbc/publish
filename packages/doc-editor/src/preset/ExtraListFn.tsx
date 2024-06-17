import type {
  BoxProps,
  ColorPickerProps,
  ElementProps,
  MenuProps,
} from '@mantine/core';
import { Menu, rem, useProps } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';

import {
  BlockquoteFn,
  CodeBlockFn,
  H1Fn,
  H2Fn,
  H3Fn,
  H4Fn,
  H5Fn,
  H6Fn,
  PrimitiveFn,
  useDocEditorContext,
} from '../components';

export interface ExtraListFnProps extends BoxProps, ElementProps<'div'> {
  /** Props added to Popover component */
  menuProps?: Partial<MenuProps>;
  /** Props added to ColorPicker component */
  colorPickerProps?: Partial<ColorPickerProps>;
}

const defaultProps: Partial<ExtraListFnProps> = {};

export const ExtraListFn = ({
  ref,
  ...props
}: ExtraListFnProps & {
  ref: React.RefObject<HTMLDivElement>;
}) => {
  const { menuProps, ...others } = useProps('ExtraListFn', defaultProps, props);
  const { labels, getStyles } = useDocEditorContext();

  return (
    <Menu
      // opened
      withinPortal={false}
      trapFocus={false}
      trigger="hover"
      width={220}
      {...menuProps}
    >
      <Menu.Target>
        <PrimitiveFn
          {...others}
          aria-label={labels.colorPickerFnLabel}
          title={labels.colorPickerFnLabel}
          ref={ref}
        >
          <IconMenu2 style={{ width: rem(20), height: rem(20) }} />
        </PrimitiveFn>
      </Menu.Target>
      <Menu.Dropdown {...getStyles('linkEditorDropdown')}>
        <H1Fn fluid />
        <H2Fn fluid />
        <H3Fn fluid />
        <H4Fn fluid />
        <H5Fn fluid />
        <H6Fn fluid />
        <CodeBlockFn fluid />
        <BlockquoteFn fluid />
      </Menu.Dropdown>
    </Menu>
  );
};
