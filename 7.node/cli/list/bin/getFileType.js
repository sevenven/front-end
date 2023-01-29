const fs = require('fs');

// unix文件权限
module.exports = function getFileType(mode) {
  const isDir = mode & fs.constants.S_IFDIR;
  const isFile = mode & fs.constants.S_IFREG;
  const isLink = mode & fs.constants.S_IFLNK;
  return isDir ? 'd' : (isFile ? '-' : (isLink ? 'l' : ''))
}