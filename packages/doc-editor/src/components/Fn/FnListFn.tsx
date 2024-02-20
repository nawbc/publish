import type {
  BoxProps,
  ColorPickerProps,
  ElementProps,
  PopoverProps,
} from '@mantine/core';
import { Menu, rem, useProps } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import { forwardRef } from 'react';

import { useDocEditorContext } from '../DocEditor.context';
import { BaseFn } from './BaseFn';
import {
  BlockquoteFn,
  CodeBlockFn,
  H1Fn,
  H2Fn,
  H3Fn,
  H4Fn,
  H5Fn,
  H6Fn,
} from './fn';

export interface FnListFnProps extends BoxProps, ElementProps<'div'> {
  /** Props added to Popover component */
  popoverProps?: Partial<PopoverProps>;

  /** Props added to ColorPicker component */
  colorPickerProps?: Partial<ColorPickerProps>;
}

const defaultProps: Partial<FnListFnProps> = {};

export const FnListFn = forwardRef<HTMLDivElement, FnListFnProps>(
  (props, ref) => {
    const { ...others } = useProps('FnListFn', defaultProps, props);

    const { editor, labels, getStyles } = useDocEditorContext();

    return (
      <Menu
        opened={true}
        trigger="hover"
        trapFocus={false}
        width={220}
        // {...popoverProps}
      >
        <Menu.Target>
          <BaseFn
            {...others}
            aria-label={labels.colorPickerFnLabel}
            title={labels.colorPickerFnLabel}
            ref={ref}
          >
            <IconMenu2 style={{ width: rem(20), height: rem(20) }} />
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
          </BaseFn>
        </Menu.Target>
      </Menu>
    );
  },
);
