const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  //mode: 'production', // 默认
  mode: 'development',
  //entry: './src/index.js',
  entry: {
    main: './src/index.js',
    /*sub: './src/index.js'*/
  },
  output: {
    // 给输出路径添加前缀
    // publicPath: 'http://www.static.com',
    publicPath: '/',
    filename: '[name]_[hash].js',
    path: path.resolve(__dirname, 'bundle')
  },
  module: {
    rules: [{
      test: /\.(png|jpg|jpeg|gif)$/,
      /*use: {
        loader: 'file-loader',
        options: {
          // placeholder
          name: '[name]_[hash].[ext]',
          outputPath: 'images/'
        }
      }*/
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 2048
        }
      }
    }, {
      test: /\.(css|scss)$/,
      // sass-loader解析.scss文件
      // css-loader分析css文件间的关系 将几个文件合并成一个文件
      // style-loader把内容挂载到header部分
      // loader的执行是从后往前的
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            // 保证在css里引入的css文件也走下面的两个loader
            importLoaders: 2,
            // css模块化打包
            modules: true
          }
        },
        'postcss-loader',
        'sass-loader'
      ]
    },{
      test: /\.(eot|ttf|woff|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'fonts/',
        }
      }
    },{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // 开发推荐 cheap-module-eval-source-map
  // 线上调试推荐 cheap-module-source-map
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    proxy: {
      '/api': 'http://localhost:3000' // 配置反向代理
    },
    // 使用Hot Module Replacement
    hot: true,
    // 即使Hot Module Replacement不生效 浏览器也不自动刷新页面
    hotOnly: true
  }
}