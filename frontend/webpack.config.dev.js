const webpack = require('webpack');
const merge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');

const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'development',
  // devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
  },
  plugins: [new DashboardPlugin(), new webpack.HotModuleReplacementPlugin()],
});
