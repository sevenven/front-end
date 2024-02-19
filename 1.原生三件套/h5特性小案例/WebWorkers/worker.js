// function fibonacci(n, caches = []) {
//   if (n <= 2) return n;
//   if (caches[n]) return caches[n];
//   return (caches[n] = fibonacci(n - 1, caches) + fibonacci(n - 2, caches)); // 递归调用
// }

function fibonacci(n) {
  if (n <= 2) return n;
  let dp0 = 1,
    dp1 = 2;
  for (let i = 2; i < n; i++) [dp0, dp1] = [BigInt(dp1), BigInt(dp0 + dp1)];
  return dp1;
}

console.log("分线程的this: ", this);
this.onmessage = function (event) {
  var number = event.data;
  console.log("分线程接收到主线程发送的数据: " + number);
  // 计算
  var result = fibonacci(number);
  postMessage(result);
  console.log("分线程向主线程返回数据: " + result);
  // 分线程中的全局对象不再是window, 所以在分线程中不可能更新界面
  // alert(result)  // alert是window的方法, 在分线程不能调用
};
