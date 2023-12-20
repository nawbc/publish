import { CSSVariablesResolver, createTheme } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

export const theme = createTheme({
  fontFamily: `Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji`,
  other: {
    nightSkyBlack: '#1A284B',
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-color-night-sky-black': theme.other.nightSkyBlack,
  },
  light: {},
  dark: {},
});

// CSS variables object, can be access in *.css.ts files
export const cssVars = themeToVars(theme);
