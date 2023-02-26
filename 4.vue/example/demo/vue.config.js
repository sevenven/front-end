module.exports = {
  pages: {
    index: {
      // 入口
      entry: 'src/main.js',
    },
  },
  lintOnSave: false, // 关闭语法检查
  // 开启代理服务器（方式一）
  // 当请求的资源8080本身就有的时候，请求不会被转发给5000
  // devServer: {
  //   proxy: 'http://localhost:5000'
  // }, 
  // 开启代理服务器（方式二）
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' },
        // ws: true, // 用于支持websocket
        // changeOrigin: true // 将请求头中的host值变成target中的host
      },
      '/demo': {
        target: 'http://localhost:5001',
        pathRewrite: { '^/demo': '' },
        // ws: true, // 用于支持websocket
        // changeOrigin: true // 将请求头中的host值变成target中的host
      }
    }
  }
}