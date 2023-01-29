const path = require('path');
const fs = require('fs');
const fg = require('fast-glob');
const log = require('./log');

// 判断是模块还是路径
function isModule(_path) {
  return !_path.startsWith('/') && !_path.startsWith('.');
}

// 拼接绝对路径
function getFullPath(filePath) {
  return isModule(filePath)
    ? require.resolve(filePath, { paths: [path.resolve(process.cwd(), './node_modules')] })
    : (path.isAbsolute(filePath) ? filePath : path.resolve(filePath));
}

const DEFAULT_CONFIG_FILE = ['web-cli-config.(js|mjs|json)'];
function getConfigPath({
  config,
  cwd = process.cwd()
} = {}) {
  let configFilePath = '';
  if (config && config !== 'undefined') {
    configFilePath = getFullPath(config);
  } else {
    const [configFile] = fg.sync(DEFAULT_CONFIG_FILE, {
      cwd,
      absolute: true
    });
    configFilePath = configFile;
  }
  return configFilePath;
}

async function loadModule(modulePath) {
  let result = null;
  let fullPath = getFullPath(modulePath);
  if (modulePath && fs.existsSync(fullPath)) {
    const isMjs = fullPath.endsWith('mjs');
    if (isMjs) {
      result = (await import(fullPath)).default
    } else {
      result = require(fullPath)
    }
  }
  return result;
}

module.exports = {
  getFullPath,
  getConfigPath,
  loadModule,
  log
}