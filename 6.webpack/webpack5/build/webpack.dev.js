const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  // webpack5-eval放前面
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: './dist',
  },
  output: {
    filename: '[name].bundle.js',
  },
});