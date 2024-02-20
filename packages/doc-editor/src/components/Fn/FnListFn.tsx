import type {
  BoxProps,
  ColorPickerProps,
  ElementProps,
  PopoverProps,
} from '@mantine/core';
import { Menu, rem, Text, useProps } from '@mantine/core';
import {
  IconArrowsLeftRight,
  IconMenu2,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import { forwardRef } from 'react';

import { useDocEditorContext } from '../DocEditor.context';
import { BaseFn } from './BaseFn';

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

    const { labels, getStyles } = useDocEditorContext();

    return (
      <Menu
        // opened={opened}
        // withinPortal={false}
        trigger="hover"
        trapFocus={false}
        // {...popoverProps}
      >
        <Menu.Target>
          <BaseFn
            {...others}
            aria-label={labels.colorPickerFnLabel}
            title={labels.colorPickerFnLabel}
            ref={ref}
            // onMouseEnter={open}
            // onMouseLeave={close}
          >
            <IconMenu2 style={{ width: rem(20), height: rem(20) }} />
            <Menu.Dropdown {...getStyles('linkEditorDropdown')}>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Settings
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessageCircle
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Messages
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconPhoto style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Gallery
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSearch style={{ width: rem(14), height: rem(14) }} />
                }
                rightSection={
                  <Text size="xs" c="dimmed">
                    ⌘K
                  </Text>
                }
              >
                Search
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconArrowsLeftRight
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Transfer my data
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Delete my account
              </Menu.Item>
            </Menu.Dropdown>
          </BaseFn>
        </Menu.Target>
      </Menu>
    );
  },
);
