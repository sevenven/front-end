// 1.改变this指向为指定对象 对象参数为null时指向window
// 2.执行函数
// 3.函数可以有返回值

// 模拟Function.prototype.call
Function.prototype.myCall = function (ctx, ...args) {
  const context = ctx || window,
    uniqueKey = Symbol();
  context[uniqueKey] = this;
  const result = context[uniqueKey](...args);
  delete context[uniqueKey];
  return result;
};

var name = "seven-window";
const foo = {
  name: "seven",
};
function bar(age, gender) {
  console.log(this.name, age, gender);
  return "bobozanzan";
}

console.log(bar.myCall(null, 25, "female"));
console.log(bar.myCall(foo, 25, "female"));
console.log(bar.myCall(foo));
