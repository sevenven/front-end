const path = require('path');
const chokidar = require('chokidar');
const child_process = require('child_process');
const log = require('../utils/log');
const { getConfigPath } = require('../utils/index');

// 启动webpack服务的子进程
let child;
let serverOpts;

module.exports = function (opts, cmd) {
  // webpack服务
  serverOpts = opts;
  runServer(serverOpts);
  // 监听配置修改
  runWatcher(opts);
}

// 启动webpack服务
function runServer(args = {}) {
  const { config, customWebpackPath } = args;
  const scriptPsth = path.resolve(__dirname, './startServer.js');
  // 通过子进程启动webpack-dev-server服务
  // 子进程启动可以避免主进程收到影响
  // 子进程启动可以方便重启，解决配置修改后无法重启的问题
  child = child_process.fork(scriptPsth, [
    '--port 8080',
    '--config ' + config,
    '--customWebpackPath ' + customWebpackPath
  ]);

  child.on('exit', code => {
    code && process.exit(code);
  })
}

// 启动配置监听服务
function runWatcher(args = {}) {
  const { config } = args;
  const configPath = getConfigPath({ config });

  chokidar.watch(configPath)
    .on('change', handleConfigChange)
    .on('error', error => {
      log.error('', 'file watch error: ', error);
      process.exit(1);
    })
}

function handleConfigChange(eventName, path) {
  log.verbose('handleConfigChange~~~')
  child.kill();
  runServer(serverOpts);
}