// 1.对象参数可以为null
// 2.改变this指向
// 3.执行函数
// 4.函数可以有返回值

// 模拟Function.prototype.call
Function.prototype.call2 = function (ctx) {
  var context = ctx || window,
    args = [],
    res;
  context.fn = this;
  for (var i = 1, len = arguments.length; i < len; i++)
    args.push("arguments[" + i + "]");
  res = eval("context.fn(" + args + ")");
  delete context.fn;
  return res;
};

var name = "seven-window";
var foo = {
  name: "seven",
};
function bar(age, gender) {
  console.log(this.name, age, gender);
  return "bobozanzan";
}

console.log(bar.call2(null, 25, "female"));
console.log(bar.call2(foo, 25, "female"));
