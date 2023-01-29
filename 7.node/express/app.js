const express = require('express');

// 1.创建服务
const app = express();

// 中间件：处理请求的业务逻辑
// 前置中间件
app.use(function (req, res, next) {
  console.log('middleware-before');
  // 执行下一个中间件
  next();
})

// 路由中间件：第一个参数为路由，第二个参数为回调函数
app.use('/test', function (req, res, next) {
  res.send('test');
  next();
})

// 静态资源
app.use('/static', express.static('./static'));

// 2.拦截路由-本质是个路由中间件
app.get('/', function (req, res, next) {
  console.log('app.get')
  res.send(`
    <html>
      <body>
        <div style="color: red">red</div>
      </body>
    </html>
  `);
  next();
})

// 后置中间件
app.use(function (req, res, next) {
  console.log('middleware-after');
  new Promise((resolve, reject) => {
    console.log('promise');
    resolve();
  }).then(() => {
    console.log('then');
    throw new Error('promise error');
  })
  // 抛出异常
  throw new Error('this is an error');
})

// 异常中间件
// 注意事项：
// 1.异常中间件全局只包含一个
// 2.异常中间件可以传递给普通中间件
// 3.异常中间件通常放在所有中间件的最后，从而能捕捉到所有中间件的异常
// 4.异常中间只能捕捉到中间件回调函数中的异常
app.use(function (err, req, res, next) {
  console.error('error', err.message)
})

// 全局异常捕获
process.on('uncaughtException', function (err) {
  console.error('uncaughtException', err.message);
})
// throw new Error('error!')

// 全局promise异常捕获
process.on('unhandledRejection', function (err) {
  console.error('unhandledRejection', err.message);
})

// 3.启动服务
const port = 8080;
app.listen(port, function () {
  console.log('服务启动成功（端口号：' + port + '）')
})