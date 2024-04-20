const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:5].bundule.js',
    assetModuleFilename: 'images/[name].[contenthash:5][ext]',
  },
  performance: {
    maxAssetSize: 250000,
    maxEntrypointSize: 250000,
    hints: 'warning',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'metaX',
      filename: 'index.html',
      template: resolve(__dirname, '../src/index.html'),
      favicon: './public/favicon.ico',
    }),
  ],
};
