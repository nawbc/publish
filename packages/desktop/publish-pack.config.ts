import '@deskbtm/gadgets';

import path from 'node:path';

import { configure, HTML } from '@publish/dev';

export default configure({
  entry: {
    main: path.resolve(__dirname, './src/main.tsx'),
  },
  plugins: [
    new HTML({
      template: path.resolve(__dirname, './index.html'),
      inject: 'body',
      scriptLoading: 'module',
      minify: kProdMode,
      filename: 'index.html',
    }),
  ],
});
