#### 目标
编写一个提供基础打包功能的脚手架，简化复杂的webpack流程，将业务通用配置封装到脚手架中，可根据项目需要自行扩展webpack配置。

#### 运行流程
[![工程化脚手架流程图](https://s3.bmp.ovh/imgs/2023/02/09/ec88b62ae546752a.png "工程化脚手架流程图")](https://s3.bmp.ovh/imgs/2023/02/09/ec88b62ae546752a.png "工程化脚手架流程图")

#### 使用说明
请保证node版本大于等于14.17.5
安装web-cli（可本地 link）
在跟目录下运行

`web-cli start` 启动服务
`web-cli build` 打包项目

#### 扩展配置
在项目根目录下新建
web-cli-config.js

```javascript
const path = require('path');

module.exports = {
  plugins: [
    // 可以是一个模块， 后面为模块参数
    ['./plugins/pluginA.js', {
      name: 'seven'
    }],
    // 可以是一个匿名函数
    function (api, params) {
      const dir = process.cwd();
      const webpackConfig = api.getWebpackConfig();
      // 使用webpack-chain 修改或扩展webpack配置
      webpackConfig
        .entry('login')
        .add(path.resolve(dir, './src/login.js'));
    }
  ],
  hooks: [
    ['start', (context) => {
      // we-cli会提供一些hooks
      // hooks会在脚手架执行到某个时机的时候执行
      // 如果希望可以在这个时机做一些事情
      // 就可以注册这个hook并实现相应逻辑
    }],
  ]
}
```