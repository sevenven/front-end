const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/dist/plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[hash:8].bundle.js'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist')
    },
    compress: true,
    port: 8080,
    hot: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
    // 代码分割策略
    splitChunks: {
      // all分割异步和同步引入的代码、async 只分割异步引入的方法
      chunks: 'all',
      // 分割出来的代码体积最小要多小-单位Bytes
      minSize: 30 * 1024,
      // webpack会尝试根据maxSize和打包出来的代码进行二次分割
      maxSize: 500 * 1024,
      // cacheGroups里面的分组按照默认的名字来
      name: 'common',
      // 代码分割的组
      cacheGroups: {
        jquery: {
          name: 'jquery',
          test: /jquery/,
          chunks: 'all'
        },
        // lodash: {
        //   name: 'lodash',
        //   test: /lodash-es/,
        //   chunks: 'all'
        // }
      }
    }
  },
  // performance: { // 关闭性能提示
  //   hints: false,
  // },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: 'asset/resource',
      parser: {
        dataUrlCondition: {
          maxSize: 1 * 1024,
        },
      },
      generator: {
        filename: 'images/[name].[hash:8][ext]',
      },
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[name].chunk.[hash:8].css'
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new VueLoaderPlugin()
  ]
}