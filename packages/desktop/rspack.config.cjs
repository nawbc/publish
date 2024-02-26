const rspack = require('@rspack/core');
const refreshPlugin = require('@rspack/plugin-react-refresh');
const NodePolyfill = require('@rspack/plugin-node-polyfill');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  mode: process.env.NODE_ENV,
  entry: {
    main: './src/main.tsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: {
                targets: [
                  'chrome >= 87',
                  'edge >= 88',
                  'firefox >= 78',
                  'safari >= 14',
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
          },
        ],
        type: 'css/auto',
      },
    ],
  },
  plugins: [
    new rspack.DefinePlugin({
      'globalThis.process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new rspack.ProgressPlugin({}),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new VanillaExtractPlugin(),
    new NodePolyfill(),
    isDev ? new refreshPlugin() : null,
  ].filter(Boolean),
};
