const path = require('path');
const FooterPlugin = require('./plugin/footer-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    // loader执行顺序为从右到左（或从下到上）的执行
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.seven$/,
      use: [path.resolve(__dirname, './loader/seven-loader.js')]
    }]
  },
  plugins: [
    new FooterPlugin({
      banner: 'hello'
    })
  ]
}