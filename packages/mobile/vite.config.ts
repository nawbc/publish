import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import million from 'million/compiler';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react({ plugins: [['@swc-jotai/react-refresh', {}]] }),
    vanillaExtractPlugin(),
  ],
  clearScreen: false,
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
});
