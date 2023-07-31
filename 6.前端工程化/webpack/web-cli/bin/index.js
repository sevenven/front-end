#!/usr/bin/env node

if (checkDebug()) {
  process.env.LOG_LEVEL = 'verbose';
}

const { program } = require('commander');
const pkg = require('../package.json');
const checkNode = require('../lib/checkNode');
const startServer = require('../lib/start/index');
const build = require('../lib/build/index');
const log = require('../lib/utils/log');

const MIN_NODE_VERSION = '14.17.5';

function checkDebug() {
  return process.argv.indexOf('--debug') >= 0 || process.argv.indexOf('-d') >= 0
}

try {
  if (!checkNode(MIN_NODE_VERSION)) {
    throw new Error('Please upgrade your node version to v' + MIN_NODE_VERSION)
  }

  program.version(pkg.version);

  program
    .command('start')
    .option('-c, --config <config>', '配置文件路径', '')
    .option('--custom-webpack-path <customWebpackPath>', '自定义webpack路径', '')
    .description('start server by web-cli')
    .allowUnknownOption()
    .action(startServer);

  program
    .command('build')
    .option('-c, --config <config>', '配置文件路径')
    .option('--custom-webpack-path <customWebpackPath>', '自定义webpack路径', '')
    .description('build projrct by web-cli')
    .allowUnknownOption()
    .action(build);

  program
    .option('-d, --debug', '开启调试模式')

  program.parse(process.argv);
} catch (error) {
  log.error('', error.message)
}