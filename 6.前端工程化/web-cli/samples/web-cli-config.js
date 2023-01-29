const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: path.resolve(__dirname, './dist/bundle.js'),
  // plugins: [
  //   'copyright-plugin',
  //   ['copyright-plugin', {
  //     name: 'seven'
  //   }],
  //   ['./plugins/copyright-plugin.js', {
  //     name: 'seven'
  //   }],
  //   function () {
  //     console.log('this is anonymous plugin')
  //   }
  // ],
  plugins: function () {
    // 一些处理逻辑
    return [
      ['./plugins/copyright-plugin.js', {
        name: 'seven'
      }]
    ]
  },
  hooks: [
    // ['start', (context) => {
    //   // console.log('start', context);
    // }],
    ['start', './hooks/config-start-hook.js']
    // ['configResolved', 'config-start-hook']
  ]
}