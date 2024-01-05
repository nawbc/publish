import { style } from '@vanilla-extract/css';

export const panelSlideTransition = style({
  willChange: 'width',
  transition: 'width 400ms cubic-bezier(.29, 1.01, 1, -0.68)',
});
