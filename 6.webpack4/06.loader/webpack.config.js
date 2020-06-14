const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          // 06.loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
          loader: 'replaceLoader',
          options: {
            name: 'seven'
          }
        },{
          loader: 'replaceLoaderAsync',
        }]
      }
    ]
  }
}