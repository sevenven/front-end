const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    open: true,
    overlay: true,
    publicPath: 'http://localhost:8080',
    proxy: {
      '/react/api': 'http://www.dell-lee.com'
    },
    hot: true,
    // hotOnly: true
  }
}
module.exports = merge(commonConfig, devConfig);