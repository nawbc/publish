import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { eruda } from '@publish/dev';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import mkcert from 'vite-plugin-mkcert';

const enableRemoteDebug = process.env.ENABLE_REMOTE_DEBUG === 'true';
const enableIstanbul = !!process.env.CI || !!process.env.COVERAGE;

const cwd = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eruda({ debug: enableRemoteDebug }),
    mkcert(),
    million.vite({ auto: true }),
    react({ plugins: [['@swc-jotai/react-refresh', {}]] }),
    vanillaExtractPlugin(),
    // enableIstanbul &&
    //   istanbul({
    //     // cwd: fileURLToPath(new URL('../..', import.meta.url)),
    //     include: ['packages/**/src/*'],
    //     exclude: [
    //       'node_modules',
    //       'tests',
    //       // fileURLToPath(new URL('.', import.meta.url)),
    //     ],
    //     forceBuildInstrument: true,
    //   }),
  ],
  envDir: resolve(cwd, '../../'),
  clearScreen: false,
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
  },
  resolve: {
    alias: {
      '~': resolve(cwd, './src'),
    },
  },
  envPrefix: ['VITE_', 'TAURI_'],
});
