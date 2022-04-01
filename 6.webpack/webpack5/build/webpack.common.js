const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    // another: './src/another.js',
    // 指定需要提取的公共模块
    // shared: 'lodash',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    // webpack5
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css|scss$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      // webpack新写法
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        // 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack 5',
    }),
  ],
  optimization: {
    splitChunks: {
      // 提取公共模块
      // webpack5下不需要配置entry.shared，可自动提取不同入口的公共模块
      chunks: 'all',
       // 打包生成的模块至少用了它多少次的时候才对它进行代码分割
      //  minChunks: 2,
    },
  },
  devServer: {
    static: './dist',
    hot: true,
  }
};