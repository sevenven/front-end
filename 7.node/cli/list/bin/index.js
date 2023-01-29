#!/usr/bin/env node
const fs = require('fs');
const parseArgs = require('./parseArgs');
const getFileType = require('./getFileType');
const auth = require('./auth');
const getFileInfo = require('./getFileInfo');

const { isAll, isList } = parseArgs();
const dir = process.cwd();
let output = '';
// 获取当前文件夹下的所有文件
let files = fs.readdirSync(dir);

if (!isAll) {
  // 排除以.开头的文件或文件夹
  files = files.filter(file => file.indexOf('.') !== 0)
}
if (!isList) {
  output = files.join('\t');
} else {
  files = files.map(file => {
    const stat = fs.statSync(file);
    const fileType = getFileType(stat.mode);
    const authStr = auth(stat.mode);
    const fileInfo = getFileInfo(stat);
    return fileType + authStr + '\t' + fileInfo + '\t' + file;
  })
  output = files.join('\n');
}

console.log(output);
