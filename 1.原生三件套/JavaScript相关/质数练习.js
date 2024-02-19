/*
 * 质数：只能被1和它自身整除的数，1不是质数也不是合数，质数必须是大于1的自然数。
 *
 */
console.time("test");
var arr = [];
var flag;
for (var i = 2; i < 10000; i++) {
  flag = true;
  for (j = 2; j <= Math.sqrt(i); j++) {
    if (i % j == 0) {
      flag = false;
      break;
    }
  }
  if (flag) arr.push(i);
}
console.log(arr);
console.timeEnd("test");
