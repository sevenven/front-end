const path = require('path')

const port = 80;
const title = 'Vue最佳实践'

function resolve (dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  publicPath: '/best-practice',
  devServer: {
    port
  },
  configureWebpack: {
    name: title
  },
  chainWebpack (config) {
    // 对config进行链式操作即可修改loader、plugins
    // 1.svg rule中要排除icons目录
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))
    // 2.添加一个规则icons
    config.module.rule('icons').test(/\.svg$/)
      .include.add(resolve('src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}