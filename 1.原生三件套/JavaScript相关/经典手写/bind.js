// 1.返回一个函数
// 2.可以在bind的时候传参，也可以在执行函数的时候传参
// 3.返回的函数可以new

// 模拟Function.prototype.bind
Function.prototype.myBind = function (ctx, ...args) {
  const func = this,
    noop = function () {};
  noop.prototype = this.prototype;
  const bindFn = function (...moreArgs) {
    return func.apply(ctx || window, args.concat(moreArgs));
  };
  bindFn.prototype = new noop();
  return bindFn;
};

var name = "seven-window";
const foo = {
  name: "seven",
};
function bar(age, gender) {
  console.log(this.name, age, gender);
  return "bobozanzan";
}
bar.prototype.sayHi = function () {
  console.log("Hi~");
};

const barFoo = bar.myBind(foo, 25);
barFoo("female");
const bf = new barFoo("female");
bf.sayHi();
