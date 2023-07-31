const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index:  path.resolve(__dirname, './src/pages/index/index.js'),
    login:  path.resolve(__dirname, './src/pages/login/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[contenthash:8].bundle.js'
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
        filename: 'images/[name].[contenthash:8][ext]',
      },
    }, {
      test: /\.html$/,
      use: {
        loader: 'html-loader'
      }
    }, {
      test: /\.ejs$/,
      use: [
        {
          loader: 'ejs-loader',
          options: {
            esModule: false,
            variable: 'data',
          },
        },
      ],
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template:  path.resolve(__dirname, './src/pages/index/index.ejs'),
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.resolve(__dirname, './src/pages/login/index.html'),
      chunks: ['login']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].chunk.[contenthash:8].css'
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}