import type {
  CSSVariablesResolver,
  VariantColorsResolver,
} from '@mantine/core';
import { createTheme, defaultVariantColorsResolver } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    '--mantine-color-resize-active-delimiter':
      theme.other.panelActiveDelimiterLight,
    '--mantine-color-resize-inactive-delimiter':
      theme.other.panelInActiveDelimiterLight,
  },
  dark: {
    '--mantine-color-resize-active-delimiter':
      theme.other.panelActiveDelimiterDark,
    '--mantine-color-resize-inactive-delimiter':
      theme.other.panelInActiveDelimiterDark,
  },
});

export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  return defaultResolvedColors;
};

export const theme = createTheme({
  fontFamily: `Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji`,
  components: {
    ActionIcon: {
      defaultProps: {
        variant: 'transparent',
      },
    },
  },
  // primaryColor: 'gray',
  other: {
    panelActiveDelimiterLight: '#1A284B',
    panelInActiveDelimiterLight: 'var(--mantine-color-gray-1)',
    panelActiveDelimiterDark: '#CECECE',
    panelInActiveDelimiterDark: '#323439',
  },
});

// CSS variables object, can be access in *.css.ts files
export const cssVars = themeToVars(theme);
