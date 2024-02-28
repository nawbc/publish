import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const __dirname = fileURLToPath(new URL('.', import.meta.url));
export const __filename = fileURLToPath(import.meta.url);
export const __rootProject = fileURLToPath(
  new URL('../../../../', import.meta.url),
);
export const __project = fs.realpathSync(process.cwd());

export const resolveRelativeProject = (relativePath: string) =>
  path.resolve(__dirname, relativePath);
