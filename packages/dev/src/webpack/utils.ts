import 'webpack-dev-server';

import { createRequire } from 'node:module';
import path from 'node:path';

// import { fileURLToPath } from 'node:url';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import { findPackageRoot, findProjectRoot } from 'workspace-tools';

import { createConfiguration } from './base.config';
import { createDevServerConfiguration } from './dev-server.config';

export const __rootProject = findProjectRoot(process.cwd()) as string;
export const __project = findPackageRoot(process.cwd()) as string;

export const resolveRelativeProject = (relativePath: string) =>
  path.resolve(__project, relativePath);

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
 * ```
 */
export async function configure(config: Configuration) {
  const baseConfig = createConfiguration();
  const serverConfig = await createDevServerConfiguration();

  return merge(baseConfig, config, serverConfig);
}
