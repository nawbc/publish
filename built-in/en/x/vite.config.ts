// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, './src/index.ts'),
      name: 'PublishPluginX',
      fileName: 'index',
    },
  },
});
