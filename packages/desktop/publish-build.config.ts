import '@deskbtm/gadgets';

import path from 'node:path';

import { configure, HTML } from '@publish/dev';

// (async () => {
//   const config = await configure({
//     entry: {},
//     plugins: [
//       new HTML({
//         template: path.resolve(__dirname, './index.html'),
//         inject: 'body',
//         scriptLoading: 'module',
//         minify: false,
//         chunks: ['app'],
//         filename: 'index.html',
//       }),
//     ],
//   });

//   const compiler = webpack(config);

//   compiler.run((err, state) => {});
// })();

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
      chunks: ['app'],
      filename: 'index.html',
    }),
  ],
});
