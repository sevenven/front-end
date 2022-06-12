const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    // __dirname 当前文件所在目录的路径
    path: path.resolve(__dirname, 'dist'),
    // 生成的js文件名
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.type$/,
        use: [path.resolve(__dirname, './loader/type-loader.js')]
      }
    ]
  },
  devtool: 'source-map'
}