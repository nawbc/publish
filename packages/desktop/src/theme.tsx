import type { CSSVariablesResolver } from '@mantine/core';
import { createTheme, rem } from '@mantine/core';

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--publish-doc-editor-max-width': rem(888),
  },
  light: {
    '--publish-color-active-divider-handler':
      theme.other.activeDividerHandlerLight,
    '--publish-color-inactive-divider-handler':
      theme.other.inActiveDividerHandlerLight,
    '--publish-color-contextmenu-hover': theme.other.contextMenuHoverLight,
    '--publish-color-contextmenu-border': theme.other.contextMenuBorder,
    '--publish-backdrop-color-default': '#ffffff80',
    '--publish-backdrop-filter': 'saturate(180%) blur(10px)',
  },
  dark: {
    '--publish-color-active-divider-handler':
      theme.other.activeDividerHandlerDark,
    '--publish-color-inactive-divider-handler':
      theme.other.inActiveDividerHandlerDark,
    '--publish-color-contextmenu-hover': theme.other.contextMenuHoverLight,
    '--publish-color-contextmenu-border': theme.other.contextMenuBorder,
  },
});

export const theme = createTheme({
  fontFamily: `Inter,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, system-ui`,
  components: {
    ActionIcon: {
      defaultProps: {
        variant: 'transparent',
      },
    },
    ScrollArea: {
      styles: {
        thumb: {
          borderRadius: 0,
        },
      },
    },
  },
  other: {
    activeDividerHandlerLight: '#1A284B',
    inActiveDividerHandlerLight: 'var(--mantine-color-gray-1)',
    activeDividerHandlerDark: '#CECECE',
    inActiveDividerHandlerDark: '#323439',
    contextMenuHoverLight: '#B4B4B43F',
    contextMenuHoverDark: '#FFFFFF4a',
    contextMenuBorder: '0 0 0 1px var(--mantine-color-gray-2)',
  },
});
