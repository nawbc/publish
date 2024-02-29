import 'webpack-dev-server';

import { createRequire } from 'node:module';
import path from 'node:path';

// import { fileURLToPath } from 'node:url';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import { findPackageRoot, findProjectRoot } from 'workspace-tools';

import { createConfiguration } from './config';

// export const __dirname = fileURLToPath(new URL('.', import.meta.url));
// export const __filename = fileURLToPath(import.meta.url);
export const __rootProject = findProjectRoot(process.cwd()) as string;
export const __project = findPackageRoot(process.cwd()) as string;

export const resolveRelativeProject = (relativePath: string) =>
  path.resolve(__dirname, relativePath);

export const require = createRequire(import.meta.url);

/**
 * Configure webpack
 *
 * @param config
 * ```ts file=publish.config.mjs
 *
 * export default configure({
 *    entry: {
 *      main: './src/main.tsx'
 *    },
 *    plugins: [
 *
 *    ]
 * })
 *
 *
 * ```
 */
export function configure(...config: Configuration[]) {
  const baseConfig = createConfiguration();

  return merge(baseConfig, ...(config as any));
}
