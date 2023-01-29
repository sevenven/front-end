const path = require('path');

module.exports = {
  //mode: 'production', // 默认
  mode: 'development',
  //entry: './src/index.js',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle')
  }
}