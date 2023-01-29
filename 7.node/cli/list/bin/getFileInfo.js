module.exports = function getFileInfo(stat) {
  const { birthtimeMs, size } = stat;
  const birthTime = new Date(birthtimeMs);
  const year = birthTime.getFullYear();
  const month = birthTime.getMonth() + 1;
  const date = birthTime.getDate();
  const hours = birthTime.getHours();
  const minutes = birthTime.getMinutes();

  return size + '\t' + `${year}-${month}-${date} ${hours > 10 ? hours : '0' + hours}:${minutes > 10 ? minutes : '0' + minutes} `;
}