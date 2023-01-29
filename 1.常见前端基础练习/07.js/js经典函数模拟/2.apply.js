// 与Function.prototype.call2差不多 参数形式有所不同

// 模拟Function.prototype.apply
Function.prototype.apply2 = function (ctx, arr) {
  var context = ctx || window,
    args = [],
    len = arr && arr.length || 0,
    res;
  context.fn = this;
  for (var i = 0; i < len; i++)
    args.push('arr[' + i + ']');
  res = eval('context.fn(' + args + ')');
  delete context.fn;
  return res;
}

var name = 'seven-window';
var foo = {
  name: 'seven'
};
function bar(age, gender) {
  console.log(this.name, age, gender);
  return 'bobozanzan';
}

console.log(bar.apply2(null, [25, 'female']));
console.log(bar.apply2(foo, [25, 'female']));
console.log(bar.apply2(foo));