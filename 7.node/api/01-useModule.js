// const os = require('os');
// const mem = os.freemem() / os.totalmem() * 100;

// console.log(`内存占用率${100 - mem.toFixed(2)}%`);

const download = require('download-git-repo');
const ora = require('ora');
const process = ora(`下载algo项目`);

process.start();

download('github:wangzheng0822/algo', 'download/algo', err => {
  // console.log(err ? err : 'Success');
  if (err) {
    process.fail();
  } else {
    process.succeed();
  }
})