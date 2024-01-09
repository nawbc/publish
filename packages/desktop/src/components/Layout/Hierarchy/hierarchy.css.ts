import { globalStyle, style } from '@vanilla-extract/css';

export const treeRoot = style({
  listStyleType: 'none',
});

export const listItem = style({
  listStyleType: 'none',
});

globalStyle(`${treeRoot} li,ul`, {
  paddingInlineStart: 10,
});
