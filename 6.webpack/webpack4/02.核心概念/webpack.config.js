const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // mode: 'production', // 默认
  mode: 'development',
  // 打包的入口
  // entry: './src/index.js',
  // 可以有多个打包的入口
  entry: {
    main: './src/index.js',
    // sub: './src/index.js'
  },
  // 打包的出口
  output: {
    // 给输出路径添加前缀
    // publicPath: 'http://www.static.com',
    publicPath: '/',
    // 生成的js文件名
    filename: '[name]_[hash].js',
    // __dirname 当前文件所在目录的路径
    path: path.resolve(__dirname, 'bundle')
  },
  module: {
    rules: [{
      test: /\.(png|jpg|jpeg|gif)$/,
      // use: {
      //   loader: 'file-loader', // 将图片打包移动到指定目录下
      //   options: {
      //     // 占位符(placeholder)写法
      //     name: '[name]_[hash].[ext]',
      //     outputPath: 'images/'
      //   }
      // },
      use: {
        loader: 'url-loader', // 当文件体积小于limit时会打包成base64随js加载，大于limit时将图片打包移动到指定目录下
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 2048 // 2KB = 2048Byte
        }
      }
    }, {
      test: /\.(css|scss)$/,
      // loader的执行顺序是从后往前的
      use: [
        // style-loader把内容挂载到header部分
        'style-loader',
        // css-loader分析css文件间的关系 将几个文件合并成一个文件
        {
          loader: "css-loader",
          options: {
            // sass里面引入的sass文件也会走下面的两个loader
            importLoaders: 0, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            // css模块化打包-style.xxx 类名打包后会变成'ZYAf6xDyRZF56xdN2Ybxug=='
            modules: true
          },
        },
        // 解决样式兼容问题
        'postcss-loader',
        // sass-loader解析.scss文件
        'sass-loader'
      ]
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
      // babel处理ES6语法
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        // options: {
        //   "presets": [
        //     [
        //       "@babel/preset-env",
        //       {
        //         "targets": {
        //           "edge": "17",
        //           "firefox": "60",
        //           "chrome": "67",
        //           "safari": "11.1"
        //         },
        //         "useBuiltIns": "usage",
        //         "corejs": "3.6.5"
        //       }
        //     ]
        //   ]
        // }
      }
    }]
  },
  plugins: [
    // 将打包出来的js加载到相应的html上
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 每次打包前清除上一次打包的结果
    new CleanWebpackPlugin(),
    // 热更新
    // css热更新不需要写额外的代码-css-loader内置了相应的热更新的代码
    // js需要写相应支持热更新的的代码
    new webpack.HotModuleReplacementPlugin()
  ],
  // 开发推荐 cheap-module-eval-source-map:精确到行-会映射引入的第三方模块-通过eval的方式构建映射
  // 线上调试推荐 cheap-module-source-map
  // 构建映射关系-可以知道打包文件中的某一行对应的是源码当中的哪一行-不同的值对应不同的映射精度
  devtool: 'cheap-module-eval-source-map',
  // webpack-dev-server的配置项
  devServer: {
    // contentBase不设置也没啥影响
    contentBase: './dist',
    open: true,
    proxy: {
      '/api': 'http://localhost:3000' // 配置反向代理
    },
    // 使用Hot Module Replacement
    hot: true,
    // 即使Hot Module Replacement不生效 浏览器也不自动刷新页面
    hotOnly: false
  }
}