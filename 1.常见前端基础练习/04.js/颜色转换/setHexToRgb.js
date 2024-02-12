// 16进制转换为RGB
function setHexToRgb(str) {
  if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str)) return;
  let _str = str.toLowerCase().replace(/\#/, "");
  if (_str.length === 3) {
    let temp = "";
    for (let i = 0; i < 3; i++) temp += newStr.slice(i, i + 1).repet(2);
    _str = temp;
  }
  const arr = [];
  for (let i = 0; i < 6; i = i + 2)
    arr.push(parseInt("0x" + _str.slice(i, i + 2)));
  return `rgb(${arr.join(", ")})`;
}

console.log(setHexToRgb("#FF3B4C")); // rgb(255, 59, 76)
/*
 * 正则表达式解析
 * ^ 匹配字符串开始
 * $ 匹配字符串结束
 * (exp) 匹配exp
 * [] 匹配 0到9&A到F&a到f 的数字&字母
 * {n} 重复n次
 * | 分隔不同的规则
 */
/*
 * 转换规则解析
 * FF = 15 * 16^1 + 15 * 16^0 = 255
 * 3B = 3 * 16^1 + 11 * 16^0 = 59
 * 4C = 4 * 16^1 + 12 * 16^0 = 76
 */
