import type {
  CSSVariablesResolver,
  VariantColorsResolver,
} from '@mantine/core';
import { createTheme, defaultVariantColorsResolver } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    '--publish-color-active-divider-handler':
      theme.other.activeDividerHandlerLight,
    '--publish-color-inactive-divider-handler':
      theme.other.inActiveDividerHandlerLight,
    '--publish-color-context-menu-hover': theme.other.contextMenuHoverLight,
    '--publish-color-context-menu-border': theme.other.contextMenuBorder,
    '--publish-context-menu-bg': '#ffffff40',
  },
  dark: {
    '--publish-color-active-divider-handler':
      theme.other.activeDividerHandlerDark,
    '--publish-color-inactive-divider-handler':
      theme.other.inActiveDividerHandlerDark,
    '--publish-color-context-menu-hover': theme.other.contextMenuHoverLight,
    '--publish-color-context-menu-border': theme.other.contextMenuBorder,
  },
});

export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  return defaultResolvedColors;
};

export const theme = createTheme({
  fontFamily: `Inter,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, system-ui`,
  components: {
    ActionIcon: {
      defaultProps: {
        variant: 'transparent',
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
    contextMenuBorder: '0 0 0 1px rgba(0, 0, 0, 0.1)',
  },
});

// CSS variables object, can be access in *.css.ts files
export const cssVars = themeToVars(theme);
