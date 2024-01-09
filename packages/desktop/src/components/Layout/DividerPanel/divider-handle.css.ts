import { rem } from '@mantine/core';
import { style, styleVariants } from '@vanilla-extract/css';

export const primitiveResizeDividerArea = style({
  width: rem(16),
  cursor: 'col-resize',
  willChange: 'visibility',
  touchAction: 'none',
  vars: {
    '--_resize-divider-color': 'var(--mantine-color-resize-inactive-delimiter)',
  },
  ':hover': {
    vars: {
      '--_resize-divider-color': 'var(--mantine-color-resize-active-delimiter)',
    },
  },
});

export const dividerHandleArea = styleVariants({
  inactive: [primitiveResizeDividerArea],
  active: [
    primitiveResizeDividerArea,
    {
      cursor: 'col-resize',
    },
  ],
});

export const primitiveResizeDivider = style({
  height: '100%',
  width: rem(2),
  boxSizing: 'content-box',
  transition: '250ms linear background-color',
  outline: 'none',
  backgroundColor: 'var(--_resize-divider-color)',
});

export const dividerHandle = styleVariants({
  inactive: [primitiveResizeDivider],
  active: [
    primitiveResizeDivider,
    {
      backgroundColor: 'var(--mantine-color-resize-active-delimiter)',
    },
  ],
});
