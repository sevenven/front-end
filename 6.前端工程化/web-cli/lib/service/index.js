const fs = require('fs');
const WebpackChain = require('webpack-chain');
const WebpackDevServer = require('webpack-dev-server');
const log = require('../utils/log');
const { getFullPath, getConfigPath, loadModule } = require('../utils/index');
const constant = require('./const');
const initWebpackDevPlugin = require('../plugins/init-webpack-dev-plugin');
const initWebpackBuildPlugin = require('../plugins/init-webpack-build-plugin');
const { errorMonitor } = require('events');

class Service {

  constructor(cmd, opts) {
    this.cmd = cmd;
    this.args = opts || {};
    this.config = {};
    this.hooks = {};
    this.plugins = [];
    this.dir = process.cwd();
    this.webpack = '';
    this.webpackConfig = null;
    this.internalValue = {};
  }

  start = async () => {
    this.initWebpack();
    await this.resolveConfig();
    await this.registerHooks();
    this.emitHooks(constant.HOOK_START);
    await this.registerPlugin();
    await this.runPlugin();
    await this.startServer();
  }

  resolveConfig = async () => {
    const { config } = this.args;
    let configFilePath = getConfigPath({ config, cwd: this.dir });
    this.config = await loadModule(configFilePath);

    if (!this.config) {
      log.warn('', '配置文件不存在，终止执行');
      process.exit(1);
    }

    this.webpackConfig = new WebpackChain();
  }

  registerHooks = async () => {
    const { hooks = [] } = this.config;
    for (let hook of hooks) {
      const [key, fn] = hook;
      if (key && fn && typeof key === 'string') {
        if (!this.hooks[key]) this.hooks[key] = [];
        if (typeof fn === 'function') {
          this.hooks[key].push(fn);
        } else if (typeof fn === 'string') {
          const result = await loadModule(fn)
          this.hooks[key].push(result);
        }
      }
    }
  }

  emitHooks = (key) => {
    const hooks = this.hooks[key] || [];
    try {
      hooks.forEach(fn => fn(this));
    } catch (error) {
      log.error('', error.message)
    }
  }

  registerPlugin = async () => {
    let { plugins } = this.config;
    if (plugins && typeof plugins === 'function') {
      plugins = plugins();
    }
    const builtInPlugins = this.cmd === 'start' ? [initWebpackDevPlugin] : [initWebpackBuildPlugin]
    plugins = plugins ? builtInPlugins.concat(plugins) : plugins;
    for (let plugin of plugins) {
      if (typeof plugin === 'string') {
        this.plugins.push({
          fn: await loadModule(plugin)
        });
      } else if (typeof plugin === 'function') {
        this.plugins.push({
          fn: plugin
        });
      } else if (Array.isArray(plugin)) {
        const [pluginPath, opts] = plugin;
        this.plugins.push({
          fn: await loadModule(pluginPath),
          params: opts
        })
      }
    }
  }

  runPlugin = async () => {
    for (let plugin of this.plugins) {
      const { fn, params } = plugin;
      if (!fn) continue;
      const API = {
        getWebpackConfig: this.getWebpackConfig,
        emitHooks: this.emitHooks,
        getValue: this.getInternalValue,
        setValue: this.setInternalValue,
        log
      };
      await fn(API, params);
    }
  }

  initWebpack = () => {
    // 从args中获取customWebpackPath属性
    // 传入了customWebpackPath时，则使用该地址引用webpack
    // 否则则使用 node_modules 中的webpack
    let { customWebpackPath } = this.args;
    if (customWebpackPath) {
      if (fs.existsSync(customWebpackPath)) {
        this.webpack = getFullPath(customWebpackPath);
      }
    } else {
      this.webpack = getFullPath('webpack');
    }
  }

  startServer = async () => {
    let compiler;
    let devServer;

    try {
      const webpack = require(this.webpack);
      const webpackConfig = this.webpackConfig.toConfig();
      compiler = webpack(webpackConfig, (error, stats) => {
        if (error) {
          log.error('', error);
        } else {
          const res = stats.toJson({
            all: false,
            errors: true,
            warnings: true,
            timings: true,
          });
          if (res.errors && res.errors.length) {
            log.error('COMPILER ERROR!')
            res.errors.forEach(error => {
              if (error.moduleName && error.loc) log.error('location', error.moduleName + ': ' + error.loc)
              log.error('messgae', error.message)
            })
          } else {
            if (res.warnings && res.warnings.length) {
              log.warn('COMPILER WARNING!')
              res.warnings.forEach(warning => {
                if (error.moduleName && error.loc) log.error('warn', warning.moduleName + ': ' + warning.loc)
                log.warn('messgae', warning.message)
              })
            }
            log.info('COMPILER SUCESSFUL!', 'Complier finish in ' + res.time + 'ms')
          }
        }
      });
      const devServerOptions = {
        // ...webpackConfig.devServer,
        port: this.args.port || 8080,
        open: true
      };
      const server = new WebpackDevServer(devServerOptions, compiler);
      await server.start();

    } catch (error) {
      log.error('', error)
    }
  }

  getWebpackConfig = () => {
    return this.webpackConfig;
  }

  getInternalValue = (key) => {
    return this.internalValue[key];
  }

  setInternalValue = (key, value) => {
    this.internalValue[key] = value;
  }

}

module.exports = Service;