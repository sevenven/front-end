
const detectPort = require('detect-port');
const inquirer = require('inquirer');
const Service = require('../service/index');
const log = require('../utils/log');

(async function () {
  const DEFAULT_PORT = 8080;

  const params = process.argv.slice(2);
  const paramObj = {};
  params.forEach(param => {
    const paramArr = param.split(' ');
    paramObj[paramArr[0].replace('--', '')] = paramArr[1];
  })

  const { config, customWebpackPath } = paramObj;
  const port = parseInt(paramObj.port || DEFAULT_PORT);

  try {
    const _port = await detectPort(port);
    if (port !== _port) {
      // 命令行交互
      const questions = {
        type: 'confirm',
        name: 'answer',
        message: port + '端口号已被占用，是否启用新端口号：' + _port
      };
      if (!(await inquirer.prompt(questions)).answer) {
        process.exit(1);
      }
    }
    const args = {
      port: _port,
      config,
      customWebpackPath
    }
    process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
    const service = new Service('start', args);
    await service.start();
  } catch (error) {
    log.error('', error);
  }

})();

