const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.(png|jpg|jpeg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 2048
        }
      }
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
    new CleanWebpackPlugin()
  ],
  /*
  实际应用的时候如果没有什么特殊要求可以就这么配置
  optimization: {
    splitChunks: {
      chunks: "all",
    }
  },*/
  optimization: {
    // tree shaking
    usedExports: true,
    splitChunks: {
      // all分割异步和同步引入的代码
      // async 只分割异步引入的方法
      chunks: "all",
      // 分割的代码体积最小要多小
      minSize: 30000,
      // 尝试根据maxSize和打包出来的代码进行二次分割
      // maxSize: 50000,
      // 打包生成的模块至少用了它多少次的时候才对它进行代码分割
      minChunks: 1,
      // 同时加载多少个代码库
      maxAsyncRequests: 5,
      // 入口文件引入的库最多可以分割多少个
      maxInitialRequests: 3,
      // 连接符
      automaticNameDelimiter: '~',
      name: true,
      // 代码分割的组
      cacheGroups: {
        vendors: {
          // 分组规则
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10,
        },
        default: {
          // 优先级
          priority: -20,
          // 已打包分割的代码 时候重复使用
          reuseExistingChunk: true,
          filename: 'common.js'
        },
      }
    }
  }
}