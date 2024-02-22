import { globalStyle, style } from '@vanilla-extract/css';

export const treeRoot = style({
  listStyleType: 'none',
  paddingInlineStart: 10,
  margin: 0,
});

export const listItem = style({
  listStyleType: 'none',
});

globalStyle(`${treeRoot} li,ul`, {
  paddingInlineStart: 6,
});
