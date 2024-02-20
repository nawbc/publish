import type {
  BoxProps,
  ColorPickerProps,
  ElementProps,
  PopoverProps,
} from '@mantine/core';
import {
  ActionIcon,
  ColorPicker,
  ColorSwatch,
  Group,
  Popover,
  rem,
  SimpleGrid,
  Tooltip,
  useProps,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCheck,
  IconCircleOff,
  IconColorPicker,
  IconPalette,
  IconX,
} from '@tabler/icons-react';
import { forwardRef, useState } from 'react';

import { useDocEditorContext } from '../DocEditor.context';
import { BaseFn } from './BaseFn';

export interface ColorPickerFnProps extends BoxProps, ElementProps<'div'> {
  /** Props added to Popover component */
  popoverProps?: Partial<PopoverProps>;

  /** Props added to ColorPicker component */
  colorPickerProps?: Partial<ColorPickerProps>;

  /** List of colors that the user can choose from */
  colors: string[];
}

const defaultProps: Partial<ColorPickerFnProps> = {};

export const ColorPickerFn = forwardRef<HTMLDivElement, ColorPickerFnProps>(
  (props, ref) => {
    const { popoverProps, colors, colorPickerProps, ...others } = useProps(
      'ColorPickerFn',
      defaultProps,
      props,
    );

    const { editor, labels, getStyles } = useDocEditorContext();
    const [opened, { open, close }] = useDisclosure(false);
    const [state, setState] = useState<'palette' | 'colorPicker'>('palette');
    const currentColor =
      editor?.getAttributes('textStyle').color || 'var(--mantine-color-text)';

    const handleChange = (value: string, shouldClose = true) => {
      (editor?.chain() as any).focus().setColor(value).run();
      shouldClose && close();
    };

    const handleClear = () => {
      (editor?.chain() as any).focus().unsetColor().run();
      close();
    };

    const fns = colors.map((color, index) => (
      <ColorSwatch
        key={index}
        component="button"
        color={color}
        onClick={() => handleChange(color)}
        size={26}
        m={rem(2)}
        style={{ cursor: 'pointer' }}
        title={labels.colorPickerColorLabel(color)}
        aria-label={labels.colorPickerColorLabel(color)}
      />
    ));

    return (
      <Popover
        opened={opened}
        withinPortal
        trapFocus={false}
        onClose={close}
        {...popoverProps}
      >
        <Popover.Target>
          <BaseFn
            {...others}
            aria-label={labels.colorPickerFnLabel}
            title={labels.colorPickerFnLabel}
            ref={ref}
            onMouseEnter={open}
            onMouseLeave={close}
            px="xs"
            mx={0}
          >
            <IconColorPicker
              color={currentColor}
              style={{ width: rem(20), height: rem(20) }}
            />
            <ColorSwatch color={currentColor} size={10} />
            <Popover.Dropdown {...getStyles('linkEditorDropdown')}>
              {state === 'palette' && (
                <SimpleGrid cols={7} spacing={2}>
                  {fns}
                </SimpleGrid>
              )}

              {state === 'colorPicker' && (
                <ColorPicker
                  defaultValue={currentColor}
                  onChange={(value) => handleChange(value, false)}
                  {...colorPickerProps}
                />
              )}

              <Tooltip.Group closeDelay={100}>
                <Group justify="flex-end" gap="md" mt="sm">
                  {state === 'palette' && (
                    <ActionIcon
                      radius="md"
                      variant="default"
                      onClick={close}
                      title={labels.colorPickerCancel}
                      aria-label={labels.colorPickerCancel}
                    >
                      <IconX style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                  )}

                  <ActionIcon
                    radius="md"
                    variant="default"
                    onClick={handleClear}
                    title={labels.colorPickerClear}
                    aria-label={labels.colorPickerClear}
                  >
                    <IconCircleOff
                      style={{ width: rem(16), height: rem(16) }}
                    />
                  </ActionIcon>

                  {state === 'palette' ? (
                    <ActionIcon
                      radius="md"
                      variant="default"
                      onClick={() => {
                        setState('colorPicker');
                      }}
                      title={labels.colorPickerColorPicker}
                      aria-label={labels.colorPickerColorPicker}
                    >
                      <IconColorPicker
                        style={{ width: rem(16), height: rem(16) }}
                      />
                    </ActionIcon>
                  ) : (
                    <ActionIcon
                      radius="md"
                      variant="default"
                      onClick={() => {
                        setState('palette');
                      }}
                      aria-label={labels.colorPickerPalette}
                      title={labels.colorPickerPalette}
                    >
                      <IconPalette
                        style={{ width: rem(16), height: rem(16) }}
                      />
                    </ActionIcon>
                  )}

                  {state === 'colorPicker' && (
                    <ActionIcon
                      radius="md"
                      variant="default"
                      onClick={close}
                      title={labels.colorPickerSave}
                      aria-label={labels.colorPickerSave}
                    >
                      <IconCheck style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                  )}
                </Group>
              </Tooltip.Group>
            </Popover.Dropdown>
          </BaseFn>
        </Popover.Target>
      </Popover>
    );
  },
);
