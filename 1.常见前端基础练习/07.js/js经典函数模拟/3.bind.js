// 1.返回一个函数
// 2.可以在bind的时候传参，也可以在执行函数的时候传参
// 3.返回的函数可以new

// 模拟Function.prototype.bind
Function.prototype.bind2 = function (ctx) {
  var _self = this,
    args1 = Array.prototype.slice.call(arguments, 1),
    // noop = function () { };
  var bindFn = function () {
    var args2 = Array.prototype.slice.call(arguments);
    return _self.apply(this instanceof _self ? this : ctx, args1.concat(args2));
  }
  // noop.prototype = this.prototype;
  // bindFn.prototype = new noop();
  return bindFn;
}

var name = 'seven-window';
var foo = {
  name: 'seven'
};
function bar(age, gender) {
  console.log(this.name, age, gender);
  return 'bobozanzan';
}
bar.prototype.sayHi = function () {
  console.log('Hi~');
}

var barFoo = bar.bind2(foo, 25);
console.log(barFoo('female'))
console.log('------------------------');
var bf = new barFoo('female');
bf.sayHi();