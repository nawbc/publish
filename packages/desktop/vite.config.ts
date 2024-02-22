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

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eruda({ debug: enableRemoteDebug }),
    million.vite({ auto: true }),
    react({ plugins: [['@swc-jotai/react-refresh', {}]] }),
    vanillaExtractPlugin(),
    enableIstanbul &&
      istanbul({
        cwd: __dirname,
        include: ['packages/**/src/*'],
        exclude: ['node_modules', 'tests', __dirname],
        forceBuildInstrument: true,
      }),
    mkcert(),
  ],
  envDir: resolve(__dirname, '../../'),
  clearScreen: false,
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_'],
});
