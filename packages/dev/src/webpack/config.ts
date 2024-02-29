import '@deskbtm/gadgets/env';

import path from 'node:path';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import million from 'million/compiler';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import * as threadLoader from 'thread-loader';
import { type Configuration, DefinePlugin, ProgressPlugin } from 'webpack';

import { getEnvironment } from './env';
import { __project, __rootProject, require } from './utils';

threadLoader.warmup({}, [
  'swc-loader',
  'style-loader',
  'css-loader',
  'postcss-loader',
]);

const kEnvMode = process.env.NODE_ENV as Configuration['mode'];
const publicPath = process.env.PUBLIC_PATH || '/';

/**
 * buildMode is used for bundle
 * envMode is used for environment, eg buildMode=production to minify the code
 * envMode=development to test.
 *
 * @returns
 */
export function createConfiguration(): Configuration {
  const env = getEnvironment();

  const output = {
    environment: {
      module: true,
      dynamicImport: true,
    },
    filename: (pathData) => {
      console.log(pathData.filename, '----------------------------');
      return '[name].js';
      // return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js';
    },
    //[contenthash] optimizes the browser cache.
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[name].[contenthash:8].[ext][query]',
    devtoolModuleFilenameTemplate:
      'webpack://[namespace]/[resource-path]?[loaders]',
    hotUpdateChunkFilename: 'hot/[id].[fullhash].js',
    hotUpdateMainFilename: 'hot/[runtime].[fullhash].json',
    path: path.resolve(__project, 'dist'),
    // Remove dist before build in production.
    clean: kProdMode,
    globalObject: 'globalThis',
    publicPath,
  } satisfies Configuration['output'];

  const optimization = {
    minimize: kProdMode,
    runtimeChunk: kProdMode,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        parallel: true,
        extractComments: true,
        terserOptions: {
          ecma: 2020,
          compress: {
            unused: true,
          },
          mangle: true,
        },
      }),
      kProdMode &&
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {
                jpeg: {
                  // https://sharp.pixelplumbing.com/api-output#jpeg
                  quality: 100,
                },
                webp: {
                  // https://sharp.pixelplumbing.com/api-output#webp
                  lossless: true,
                },
                avif: {
                  // https://sharp.pixelplumbing.com/api-output#avif
                  lossless: true,
                },
                // png by default sets the quality to 100%, which is same as lossless
                // https://sharp.pixelplumbing.com/api-output#png
                png: {},

                // gif does not support lossless compression at all
                // https://sharp.pixelplumbing.com/api-output#gif
                gif: {},
              },
            },
          },
        }),
    ].filter(Boolean),
    removeEmptyChunks: true,
    providedExports: true,
    usedExports: true,
    sideEffects: true,
    removeAvailableModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 1,
      minChunks: 1,
      maxInitialRequests: Number.MAX_SAFE_INTEGER,
      maxAsyncRequests: Number.MAX_SAFE_INTEGER,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  } satisfies Configuration['optimization'];

  const module = {
    parser: {
      // https://webpack.js.org/configuration/module/#ruleparser
      javascript: {
        node: false,
        requireJs: false,
        import: true,
        strictExportPresence: true,
      },
    },
    rules: [
      {
        // Disable esm module needs file extension
        test: /\.m?js?$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        enforce: 'pre',
        test: /\.(js|mjs|jsx|ts|tsx|css)$/,
        loader: require.resolve('source-map-loader'),
      },
      {
        oneOf: [
          {
            test: /\.svg$/,
            use: [
              {
                loader: require.resolve('@svgr/webpack'),
                options: {
                  prettier: false,
                  svgo: false,
                  svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                  },
                  titleProp: true,
                  ref: true,
                },
              },
              {
                loader: require.resolve('file-loader'),
                options: {
                  name: 'assets/[name].[contenthash:8].[ext]',
                },
              },
            ],
            issuer: {
              and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
            },
          },
          {
            test: /\.(png|jpg|gif|svg|webp|mp4)$/,
            type: 'asset/resource',
          },
          {
            test: /\.(ttf|eot|woff|woff2)$/,
            type: 'asset/resource',
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              // {
              //   loader: require.resolve('thread-loader'),
              // },
              {
                loader: require.resolve('swc-loader'),
                options: {
                  // https://swc.rs/docs/configuring-swc/
                  jsc: {
                    preserveAllComments: true,
                    parser: {
                      syntax: 'typescript',
                      dynamicImport: true,
                      topLevelAwait: false,
                      tsx: true,
                      decorators: true,
                    },
                    target: 'es2022',
                    externalHelpers: false,
                    transform: {
                      react: {
                        runtime: 'automatic',
                        refresh: kDevMode && {
                          refreshReg: '$RefreshReg$',
                          refreshSig: '$RefreshSig$',
                          emitFullSignatures: true,
                        },
                      },
                      useDefineForClassFields: false,
                    },
                    // ex`perimental: {
                    //   plugins: [['@swc-jotai/react-refresh', {}]],
                    // },`
                  },
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              // {
              //   loader: require.resolve('thread-loader'),
              // },
              kDevMode
                ? require.resolve('style-loader')
                : MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  url: true,
                  sourceMap: kDevMode,
                  modules: true,
                  import: true,
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    config: path.resolve(__dirname, './postcss.config.cjs'),
                  },
                },
              },
            ],
          },
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            type: 'asset/resource',
          },
        ],
      },
    ],
  } satisfies Configuration['module'];

  const plugins = [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    new ProgressPlugin({ percentBy: 'entries' }),
    kDevMode && new CaseSensitivePathsPlugin(),
    new ReactRefreshWebpackPlugin({ overlay: false, esModule: true }),
    new DefinePlugin(env.stringified),
    million.webpack({ auto: true }),
    new NodePolyfillPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__project, 'public'),
          to: path.resolve(__project, 'dist'),
        },
      ],
    }),
  ].filter(Boolean) satisfies Configuration['plugins'];

  const experiments = {
    topLevelAwait: true,
    outputModule: false,
    syncWebAssembly: true,
  } satisfies Configuration['experiments'];

  const resolve = {
    symlinks: true,
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json', '.jsx'],
  } satisfies Configuration['resolve'];

  const cache = {
    type: 'filesystem',
    version: env.hash,
    store: 'pack',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [__filename],
    },
  } satisfies Configuration['cache'];

  return {
    mode: kEnvMode,
    target: ['web', 'es5'],
    output,
    resolve,
    devtool: kProdMode ? 'source-map' : 'eval-cheap-module-source-map',
    optimization,
    module,
    context: __project,
    plugins,
    cache,
    experiments,
    infrastructureLogging: {
      level: 'none',
    },
  };
}
