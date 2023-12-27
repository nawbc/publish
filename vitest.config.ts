import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'first_party/*/vitest.config.{e2e,unit}.ts',
  'packages/*/vitest.config.{e2e,unit}.ts',
]);
