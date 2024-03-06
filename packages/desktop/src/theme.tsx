import type {
  CSSVariablesResolver,
  VariantColorsResolver,
} from '@mantine/core';
import { createTheme, defaultVariantColorsResolver, rem } from '@mantine/core';
// import { themeToVars } from '@mantine/vanilla-extract';

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--publish-doc-editor-max-width': rem(888),
  },
  light: {
    '--publish-color-active-divider-handler':
      theme.other.activeDividerHandlerLight,
    '--publish-color-inactive-divider-handler':
      theme.other.inActiveDividerHandlerLight,
    '--publish-color-context-menu-hover': theme.other.contextMenuHoverLight,
    '--publish-color-context-menu-border': theme.other.contextMenuBorder,
    '--publish-backdrop-color-default': '#ffffff80',
    '--publish-backdrop-filter': 'saturate(180%) blur(10px)',
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
  // fontSizes: {
  //   xs: rem(10),
  //   sm: rem(12),
  //   md: rem(14),
  //   lg: rem(16),
  //   xl: rem(20),
  // },
  components: {
    ActionIcon: {
      defaultProps: {
        variant: 'transparent',
        c: 'gray.7',
        color: 'gray.7',
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

// // CSS variables object, can be access in *.css.ts files
// export const cssVars = themeToVars(theme);
