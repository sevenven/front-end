const path = require('path');
// const WebpackChain = require('webpack-chain');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 初始化webpack配置
module.exports = function (api, opts) {
  const { getWebpackConfig, log } = api;

  // const config = new WebpackChain();
  const config = getWebpackConfig();
  const dir = process.cwd();
  const mode = process.env.NODE_ENV;

  // 设置构建模式
  config.mode(mode);

  // 设置entry
  config.entry('index')
    .add(path.resolve(dir, './src/index.js'))
    .end();

  // 设置output
  config.output
    .path(path.resolve(dir, './dist'))
    .filename('js/[name].[contenthash:8].bundle.js');

  // 设置loader
  // 设置css loader
  config.module
    .rule('css')
    .test(/\.css$/)
    .exclude
    .add(/node_modules/)
    .end()
    .use('mini-css')
    .loader(MiniCssExtractPlugin.loader)
    .end()
    .use('css-loader')
    .loader('css-loader');
  // 设置image loader
  config.module
    .rule('image')
    .test(/\.(png|jpg|jpeg|gif|svg)$/i)
    .type('asset/resource')
    .parser({
      dataUrlCondition: {
        maxSize: 1 * 1024,
      },
    });
  config.module.rule('image').set('generator', {
    filename: 'images/[name].[contenthash:8][ext]',
  });

  // 设置plugins
  config.plugin('HtmlWebpackPlugin')
    .use(HtmlWebpackPlugin, [{
      filename: 'index.html',
      template: path.resolve(dir, './public/index.html'),
      chunks: ['index']
    }]);
  config.plugin('MiniCssExtractPlugin')
    .use(MiniCssExtractPlugin, [{
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].chunk.[contenthash:8].css'
    }]);
  config.plugin('CleanWebpackPlugin')
    .use(CleanWebpackPlugin);

  // 设置optimization
  config.optimization
    .usedExports(true);
  config.watch(true);

  const webpackConfig = config.toConfig();
};