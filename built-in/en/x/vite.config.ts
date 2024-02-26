// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // lib: {
    //   formats: ['iife'],
    //   entry: resolve(__dirname, './src/index.ts'),
    //   name: 'PublishAddonX',
    //   fileName: 'index',
    // },
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      // output: {
      //   format: 'iife',
      //   inlineDynamicImports: false,
      // },
    },
  },
});
