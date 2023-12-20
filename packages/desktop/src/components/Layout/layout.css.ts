import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';

export const panelResizeHandle = style({
  width: rem(16),
  vars: {
    '--_resize-divider-color': 'var(--mantine-color-gray-1)',
  },
  ':hover': {
    vars: {
      '--_resize-divider-color': 'var(--mantine-color-night-sky-black)',
    },
  },
});

export const panelResizeHandleDivider = style({
  height: '98%',
  width: rem(2),
  boxSizing: 'content-box',
  transition: '250ms linear background-color',
  backgroundColor: 'var(--_resize-divider-color)',
  outline: 'none',
  selectors: {
    '&[data-resize-handle-active]': {
      backgroundColor: 'var(--_resize-divider-color)',
    },
  },
});
