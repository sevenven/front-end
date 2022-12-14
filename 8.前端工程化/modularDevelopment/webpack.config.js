const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[hash:8].bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      // type: 'asset',
      type: 'asset/resource',
      parser: {
        dataUrlCondition: {
          maxSize: 1 * 1024,
        },
      },
      generator: {
        filename: 'images/[name].[hash:6][ext]',
      },
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/login.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}