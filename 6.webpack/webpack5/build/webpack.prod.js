const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    // 避免代码改动时，manifest信息改动导致内容不没有更新的js chunk也发生了更新
    runtimeChunk: 'single',
  },
});