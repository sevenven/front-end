const fs = require('fs');

// unix文件权限
module.exports = function auth(mode) {
  // 当前用户权限
  const userReadStr = mode & fs.constants.S_IRUSR ? 'r' : '-';
  const userWriteStr = mode & fs.constants.S_IWUSR ? 'r' : '-';
  const userExecuteStr = mode & fs.constants.S_IXUSR ? 'r' : '-';
  // 当前用户组权限
  const userGroudReadStr = mode & fs.constants.S_IRGRP ? 'r' : '-';
  const userGroudWriteStr = mode & fs.constants.S_IWGRP ? 'r' : '-';
  const userGroudExecuteStr = mode & fs.constants.S_IXGRP ? 'r' : '-';
  // 其他用户权限
  const userOtherReadStr = mode & fs.constants.S_IROTH ? 'r' : '-';
  const userOtherWriteStr = mode & fs.constants.S_IWOTH ? 'r' : '-';
  const userOtherExecuteStr = mode & fs.constants.S_IXOTH ? 'r' : '-';
  return userReadStr + userWriteStr + userExecuteStr + userGroudReadStr + userGroudWriteStr + userGroudExecuteStr + userOtherReadStr + userOtherWriteStr + userOtherExecuteStr;
}