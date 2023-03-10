// Webpack (client)

// ----------------------------------------------------------------------------
// IMPORTS

/* Node */
import path from 'path';

/* NPM */
import CompressionPlugin from 'compression-webpack-plugin';
import mergeWith from 'lodash/mergeWith';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
const BrotliCompression = require('brotli-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const createDedupe = require('@team-griffin/webpack-dedupe-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/* Local */
import common, { defaultMerger, files } from './common';
import css, { rules } from './css';

// ----------------------------------------------------------------------------

const isProduction = process.env.NODE_ENV === 'production';

// Base client config
const base: webpack.Configuration = {
  // Entry
  entry: [path.resolve(__dirname, '..', 'entry', 'client.tsx')],

  // Name
  name: 'client',

  // Use `MiniCssExtractPlugin` in both dev and production, because
  // the server will need access to it in its initial render
  module: {
    rules: [
      ...css(),
      // Images
      {
        test: files.images,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: `assets/img/[name]${isProduction ? '.[hash]' : ''}.[ext]`,
            },
          },
        ],
      },

      {
        test: files.graphql,
        use: ['raw-loader'],
      },

      // Fonts
      {
        test: files.fonts,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: `assets/fonts/[name]${isProduction ? '.[hash]' : ''}.[ext]`,
            },
          },
        ],
      },
    ],
  },

  // Set-up some common mocks/polyfills for features available in node, so
  // the browser doesn't balk when it sees this stuff
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  // Output
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist', 'public'),
    publicPath: '/',
  },

  // The client bundle will be responsible for building the resulting
  // CSS file; ensure compilation is dumped into a single chunk
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          chunks: 'all',
          enforce: true,
          name: 'main',
          test: new RegExp(
            `\\.${rules.map(rule => `(${rule.ext})`).join('|')}$`
          ),
        },
      },
    },
  },

  // Add `MiniCssExtractPlugin`
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: 'assets/css/[id].css',
      filename: `assets/css/[name]${isProduction ? '.[contenthash]' : ''}.css`,
    }),

    // Add global variables
    new webpack.DefinePlugin({
      GRAPHQL: JSON.stringify(process.env.GRAPHQL),
      SERVER: false,
      WS_SUBSCRIPTIONS: process.env.WS_SUBSCRIPTIONS,
      LOCAL_STORAGE_KEY: JSON.stringify(process.env.LOCAL_STORAGE_KEY),
      DATA_SERVICE_URL: JSON.stringify(process.env.DATA_SERVICE_URL),
      TOKENIZATION_URL: JSON.stringify(process.env.TOKENIZATION_URL),
      API_URL: JSON.stringify(process.env.API_URL),
      SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
      ENV: JSON.stringify(process.env.ENV),
      APPLE_PAY_MERCHANT: JSON.stringify(process.env.APPLE_PAY_MERCHANT),
    }),
  ],
};

// Development client config
const dev: webpack.Configuration = {
  devtool: 'inline-source-map',

  // Output
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
  },
};

// Production client config
const prod: webpack.Configuration = {
  // Output
  output: {
    chunkFilename: 'assets/js/[name].[chunkhash].js',
    filename: 'assets/js/[name].[chunkhash].js',
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },

  plugins: [
    new CompressionPlugin({
      cache: true,
      minRatio: 0.99,
    }),
    new BrotliCompression({
      minRatio: 0.99,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    createDedupe(),
    new CopyPlugin([{ from: 'public' }]),
  ],
};

export default mergeWith(
  {},
  common(false),
  base,
  process.env.NODE_ENV === 'production' ? prod : dev,
  defaultMerger
);
