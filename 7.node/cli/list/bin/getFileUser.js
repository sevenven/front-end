
// 获取文件用户名及所在用户组-MacOS
module.exports = function getFileUser(stat) {
  const { uid, gid } = stat;
  const userName = cp.execSync('id -un ' + uid).toString().trim();
  const groupIds = cp.execSync('id -G' + uid).toString().trim().split(' ');
  const groupIdsName = cp.execSync('id -Gn' + uid).toString().trim().split(' ');
  const index = groupIds.findIndex(id => +id === +gid);
  const groupName = groupIdsName[index];
  return {
    userName,
    groupName
  }
}