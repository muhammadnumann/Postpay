// Webpack (static bundling)

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

import mergeWith from 'lodash/mergeWith';
import webpack from 'webpack';
import {} from 'webpack-dev-server';
// Plugin for generating `index.html` file for static hosting
import HtmlWebpackPlugin from 'html-webpack-plugin';
/* Local */

// Common config
import { defaultMerger } from './common';

// Get the client-side config as a base to extend
import client from './client';

// ----------------------------------------------------------------------------

// Augment client-side config with HtmlWebPackPlugin
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;
const googleOptimizeId = process.env.GOOGLE_OPTIMIZE_ID;
const experimentId = process.env.EXPERIMENT_ID;

const base: webpack.Configuration = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'webpack/views/static.html',
      title: 'postpay checkout',
      google_analytics_id: googleAnalyticsId,
      google_optimize_id: googleOptimizeId,
      experiment_id: experimentId,
    }),
  ],
};

export default mergeWith({}, client, base, defaultMerger);
