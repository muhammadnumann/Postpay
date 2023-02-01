require('dotenv').config();
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const webpack = require('webpack');

let cdn = isProduction
  ? process.env.POSTPAY_CDN || 'https://cdn.postpay.io'
  : '';
if (cdn.endsWith('/')) {
  cdn = cdn.substr(0, cdn.length - 1);
}

let config = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'postpay.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'postpay',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `
              $cdn: "${isProduction ? cdn : ''}";
              `,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
    ],
  },
  plugins: [
    new Visualizer({
      filename: '../stats.html',
    }),
    new webpack.DefinePlugin({
      'process.env.POSTPAY_CDN': `"${cdn}"`,
      'process.env.DEMO_CHECKOUT_API_URL': `"${process.env.DEMO_CHECKOUT_API_URL}"`,
      'process.env.SENTRY_DNS': `"${process.env.SENTRY_DNS}"`,
    }),
  ],
};

if (false === isProduction) {
  config.plugins.push(
    new HtmlWebpackPlugin({
      title: 'postpay-js example',
      template: './src/index.html',
      inject: false,
      templateParameters: (compilation, assets, assetTags, options) => {
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options,
          },
          SENTRY_DNS: process.env.SENTRY_DNS,
          DEMO_CHECKOUT_URL: process.env.DEMO_CHECKOUT_URL,
          DEMO_CHECKOUT_ID: process.env.DEMO_CHECKOUT_ID,
          DEMO_SANDBOX: process.env.DEMO_SANDBOX,
          DEMO_MERCHANT_ID: process.env.DEMO_MERCHANT_ID,
          DEMO_PRODUCT_PRICE: process.env.DEMO_PRODUCT_PRICE,
          DEMO_THEME: process.env.DEMO_THEME,
          DEMO_WIDGET_URL: process.env.DEMO_WIDGET_URL,
          DEMO_CHECKOUT_API_URL: process.env.DEMO_CHECKOUT_API_URL,
        };
      },
    })
  );
  config.devtool = 'inline-source-map';
  config.devServer = {
    contentBase: path.join(__dirname, 'static'),
    overlay: true,
    port: 8000,
    host: '0.0.0.0',
    publicPath: '/',
  };
}

module.exports = config;
