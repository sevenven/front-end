const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new CleanWebpackPlugin()
]

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
  if(/.*\.dll.js/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file)
    }))
  }
  if(/.*\.manifest.json/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file)
    }))
  }
})

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, '../dist')
  },
  // 确实需要才用 一般不用
  /*resolve: {
    // 一般资源类的文件引入时写后缀 逻辑类的文件不写后缀
    extensions: ['.js', '.jsx'],
    // 目录下默认查找的文件名字
    mainFiles: ['index', 'main'],
    alias: {
      seven: path.resolve(__dirname, '../src/hello)
    }
  },*/
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
      test: /\.(css|scss)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: true
          }
        },
        'postcss-loader',
        'sass-loader'
      ]
    },{
      test: /\.jsx?$/,
      // exclude: /node_modules/,
      include: path.resolve(__dirname, '../src'),
      use: ['babel-loader', {
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }]
    }]
  },
  plugins,
  /*plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/vendors.manifest.json')
    })
  ],*/
  optimization: {
    // tree shaking(mode为production默认开启 development设置虽然开启了也并不会真正shaking掉无用的代码)
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    },
    // code splitting实际应用的时候如果没有什么特殊要求可以就这么配置
    splitChunks: {
      chunks: "all",
    }
  }
}