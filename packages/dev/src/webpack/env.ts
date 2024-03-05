import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import dotenv from 'dotenv';
import dotenvEx from 'dotenv-expand';

import { resolveRelativeProject } from './utils';

// Make sure that including paths.js after env.js will read .env variables.

const NODE_ENV = process.env.NODE_ENV;
const dotenvPath = resolveRelativeProject('.env');

if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${dotenvPath}.${NODE_ENV}.local`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${dotenvPath}.local`,
  `${dotenvPath}.${NODE_ENV}`,
  dotenvPath,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach((dotenvFile) => {
  if (dotenvFile && fs.existsSync(dotenvFile)) {
    dotenvEx.expand(dotenv.config({ path: dotenvFile }));
  }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());

process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and PUBLISH_ENV_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const PUBLISH_ENV = /^PUBLISH_ENV_/i;

function createEnvHash(env: string) {
  const hash = createHash('md5');
  hash.update(JSON.stringify(env));

  return hash.digest('hex');
}

export function getEnvironment() {
  const raw = Object.keys(process.env)
    .filter((key) => PUBLISH_ENV.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // We support configuring the sockjs pathname during development.
        // These settings let a developer run multiple simultaneous projects.
        // They are used as the connection `hostname`, `pathname` and `port`
        // in webpackHotDevClient. They are used as the `sockHost`, `sockPath`
        // and `sockPort` options in webpack-dev-server.
        WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
        // Whether or not react-refresh is enabled.
        // It is defined here so it is available in the webpackHotDevClient.
        FAST_REFRESH: process.env.FAST_REFRESH !== 'false',
      },
    );

  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = Object.keys(raw).reduce((env, key) => {
    const value = JSON.stringify(raw[key]);
    env['process.env.' + key] = value;
    env['globalThis.process.env.' + key] = value;
    env['global.process.env.' + key] = value;
    return env;
  }, {});

  const hash = createEnvHash(JSON.stringify(raw));

  return { raw, stringified, hash };
}
