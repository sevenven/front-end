const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  devtool: 'cheap-module-source-map'
}

module.exports = merge(commonConfig, prodConfig)