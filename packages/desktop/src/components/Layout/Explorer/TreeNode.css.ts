import { rem } from '@mantine/core';
import { style, styleVariants } from '@vanilla-extract/css';

export const node = style({
  borderRadius: 'var(--mantine-radius-default)',
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    backgroundColor: 'var(--mantine-color-gray-0)',
  },
});

export const selected = style({
  backgroundColor: 'var(--mantine-color-gray-1)',
});

export const dragging = style({
  opacity: 0.4,
});

export const chevronBase = style({
  top: rem(-1),
  position: 'relative',
  transition: 'transform 200ms ease',
});

export const chevron = styleVariants({
  right: [chevronBase],
  down: [
    chevronBase,
    {
      transform: 'rotate(90deg)',
    },
  ],
});
