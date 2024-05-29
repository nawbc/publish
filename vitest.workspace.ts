import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  './vitest.config.ts',
  './packages/mobile/vite.config.ts',
  './packages/cli/src/template/typescript/vite.config.ts',
  './built-in/en/x/vite.config.ts',
]);
