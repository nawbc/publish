import { rem } from '@mantine/core';
import type { GlobalStyleRule } from '@vanilla-extract/css';
import {
  createVar,
  fallbackVar,
  globalStyle,
  keyframes,
  style,
  styleVariants,
} from '@vanilla-extract/css';

export const itemColor = createVar();
export const itemHover = createVar();
export const itemBg = createVar();
export const itemOpacity = createVar();
export const itemCursor = createVar();
const animateInDelay = '0.3s',
  animateOutDelay = '0.2s';

const feedback = keyframes({
  from: { opacity: 0.4 },
  to: { opacity: 1 },
});

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(10px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const fadeOut = keyframes({
  from: { opacity: 1, transform: 'translateY(0)' },
  to: { opacity: 0, transform: 'translateY(10px)' },
});

const scaleIn = keyframes({
  from: { opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)' },
  to: { opacity: 1 },
});

const scaleOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)' },
});

export const animations = styleVariants({
  fadeIn: {
    animation: `${fadeIn} ${animateInDelay} ease`,
  },
  fadeOut: {
    animation: `${fadeOut} ${animateOutDelay} ease`,
  },
  scaleIn: {
    transformOrigin: 'top left',
    animation: `${scaleIn} ${animateInDelay} ease`,
  },
  scaleOut: {
    transformOrigin: 'top left',
    animation: `${scaleOut} ${animateOutDelay} ease`,
  },
});

export const main = style({
  position: 'fixed',
  opacity: 0,
  width: 'max-content',
  userSelect: 'none',
  backgroundColor: 'var(--publish-context-menu-bg)',
  boxSizing: 'border-box',
  boxShadow: 'var(--publish-color-context-menu-border)',
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
  main,
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

export const itemFeedback = style({
  animation: `${feedback} 0.12s both`,
});

export const item = style({
  cursor: fallbackVar(itemCursor, 'pointer'),
  width: '100%',
  position: 'relative',
  ':focus': {
    outline: 0,
  },
  borderRadius: rem(6),
  color: fallbackVar(itemColor, 'var(--mantine-color-text)'),
  fontSize: 'var(--mantine-font-size-sm)',
  padding: 'calc(var(--mantine-spacing-xs) / 2) var(--mantine-spacing-sm)',
  backgroundColor: fallbackVar(itemBg, 'transparent'),
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  opacity: fallbackVar(itemOpacity, '1'),
});

export const subItem = style({
  position: 'relative',
});

export const itemFocus: GlobalStyleRule = {
  vars: {
    [itemBg]: fallbackVar(itemHover, 'var(--publish-color-context-menu-hover)'),
  },
};

export const subFocus: GlobalStyleRule = {
  opacity: 1,
  pointerEvents: 'initial',
};

export const leaveDisabled = style({
  pointerEvents: 'none',
});

globalStyle(`${item}:not([aria-disabled=true]):hover`, itemFocus);
globalStyle(`${item}:not([aria-disabled=true]):focus`, itemFocus);

globalStyle(`${item}[aria-disabled=true]`, {
  pointerEvents: 'none',
  vars: {
    [itemHover]: 'var(--mantine-color-dimmed) !important',
    [itemOpacity]: '0.6',
    [itemCursor]: 'default',
  },
});

globalStyle(`${subFocusOpen},${subFocusOpen} > ${item}`, itemFocus);

globalStyle(`${subFocusOpen} > ${sub}`, subFocus);

globalStyle(`${subItem}:not([aria-disabled=true]):hover > ${sub}`, subFocus);
