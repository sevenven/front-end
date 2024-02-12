// 16进制转换为RGB
function setRgbToHex(str) {
  if (!/^(rgb|RGB)/.test(str)) return;
  const arr = str.slice(4, str.length - 1).split(", ");
  let _str = "#";
  for (let a of arr) {
    let t = Number(a).toString(16);
    if (t === "0") t = t.repeat(2);
    _str += t;
  }
  return _str;
}

console.log(setRgbToHex("rgb(255, 59, 76)")); // #FF3B4C
/*
 * 转换规则解析
 * 255 = 255 % 16 = 15 余 15 = FF
 * 59 = 59 % 16 = 3 余 11 = 3B
 * 76 = 76 % 16 = 4 余 12 = 4C
 */
