import { rem } from '@mantine/core';
import type { GlobalStyleRule } from '@vanilla-extract/css';
import {
  createVar,
  fallbackVar,
  globalStyle,
  keyframes,
  style,
} from '@vanilla-extract/css';

const feedback = keyframes({
  '0%': { opacity: 0.4 },
  '100%': { opacity: 1 },
});

export const contextMenuItemColor = createVar();
export const contextMenuItemHover = createVar();
export const contextMenuItemBg = createVar();
export const itemOpacity = createVar();
export const itemCursor = createVar();

export const contextMenu = style({
  position: 'fixed',
  opacity: 0,
  width: 'max-content',
  userSelect: 'none',
  backgroundColor: 'var(--publish-context-menu-bg)',
  boxSizing: 'border-box',
  boxShadow: 'var(--publish-context-menu-border)',
  borderRadius: 'var(--mantine-radius-sm)',
  padding: rem(4),
  zIndex: 999,
  selectors: {
    '&::before': {
      content: '',
      borderRadius: 'var(--mantine-radius-sm)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backdropFilter: 'saturate(180%) blur(10px)',
    },
  },
});

export const sub = style([
  contextMenu,
  {
    position: 'absolute',
    pointerEvents: 'none',
    transition: 'opacity .265s',
    top: `calc(-1 * ${rem(4)})`,
    left: '100%',
    // opacity: 1,
    backdropFilter: 'saturate(180%) blur(10px)',
  },
]);

export const subBottom = style({
  bottom: `calc(-1 * ${rem(4)})`,
  top: 'unset',
});

export const subRight = style({
  right: '100%',
  top: 'unset',
});

export const subFocusOpen = style({});

export const contextMenuItemFeedback = style({
  animation: `${feedback} 0.12s both`,
});

export const contextMenuItem = style({
  cursor: fallbackVar(itemCursor, 'pointer'),
  width: '100%',
  position: 'relative',
  ':focus': {
    outline: 0,
  },
  borderRadius: rem(6),
  color: fallbackVar(contextMenuItemColor, 'var(--mantine-color-text)'),
  fontSize: 'var(--mantine-font-size-sm)',
  padding: 'calc(var(--mantine-spacing-xs) / 1.5) var(--mantine-spacing-sm)',
  backgroundColor: fallbackVar(contextMenuItemBg, 'transparent'),
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  opacity: fallbackVar(itemOpacity, '1'),
});

export const itemFocus: GlobalStyleRule = {
  vars: {
    [contextMenuItemBg]: fallbackVar(
      contextMenuItemHover,
      'var(--publish-context-menu-hover)',
    ),
  },
};

export const subItemFocus: GlobalStyleRule = {
  opacity: 1,
  pointerEvents: 'initial',
};

globalStyle(`${contextMenuItem}:not([aria-disabled=true]):hover`, itemFocus);
globalStyle(`${contextMenuItem}:not([aria-disabled=true]):focus`, itemFocus);

globalStyle(`${contextMenuItem}[aria-disabled=true]`, {
  pointerEvents: 'none',
  vars: {
    [contextMenuItemHover]: 'var(--mantine-color-dimmed) !important',
    [itemOpacity]: '0.6',
    [itemCursor]: 'default',
  },
});

globalStyle(`${subFocusOpen},${subFocusOpen} > ${contextMenuItem}`, itemFocus);

globalStyle(
  `${contextMenuItem}:not([aria-disabled=true]):hover > ${sub}`,
  subItemFocus,
);
