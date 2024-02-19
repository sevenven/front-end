// RGB转换为16进制
function setRgbToHex(str) {
  if (!/^(rgb|RGB)/.test(str)) return;
  const arr = str.slice(4, str.length - 1).split(", ");
  let _str = "#";
  for (a of arr) {
    let temp = Number(a).toString(16).toUpperCase();
    if (temp === "0") temp = temp.repeat(2);
    _str += temp;
  }
  return _str;
}

console.log(setRgbToHex("rgb(255, 59, 76)")); // #FF3B4C
console.log(setRgbToHex("rgb(0, 0, 0)")); // #000000

/*
 * 转换规则解析
 * 255 = 255 % 16 = 15 余 15 = FF
 * 59 = 59 % 16 = 3 余 11 = 3B
 * 76 = 76 % 16 = 4 余 12 = 4C
 */
