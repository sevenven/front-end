const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
    }, {
      test: /\.(eot|ttf|woff|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'fonts/',
        }
      }
    }, {
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

  // 实际应用的时候可以遵循以下的原则
  // 总体来讲可以使用默认配置
  // 通过统一包版本及treeshaking来控制包体积
  // 通过异步来将非首屏加载的包分出来
  // 如果首屏包确实非常大，此时可以通过配置同步的包分割，同时保证js可以并行请求来优化加载速度
  optimization: {
    // 代码分割策略
    splitChunks: {
      // all分割异步和同步引入的代码、async 只分割异步引入的方法
      chunks: "all",
      // 分割出来的代码体积最小要多小-单位Bytes
      minSize: 30 * 1024,
      // webpack会尝试根据maxSize和打包出来的代码进行二次分割
      maxSize: 300 * 1024,
      // 打包生成的模块至少用了它多少次的时候才对它进行代码分割
      minChunks: 1,
      // 同时加载多少个代码库
      maxAsyncRequests: 5,
      // 入口文件引入的库最多可以分割多少个
      maxInitialRequests: 3,
      // 文件生成的时候中间的连接符
      automaticNameDelimiter: '-',
      // cacheGroups里面的分组按照默认的名字来
      name: true,
      // 代码分割的组
      cacheGroups: {
        // 默认值
        // vendors: false,
        // default: false
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