// 一个表达式对应一个Watcher实例
function Watcher (vm, exp, cb) {
  this.$vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.val = this.get();
}

// 获取当前表达式对应的值
Watcher.prototype.get = function () {
  Dep.target = this;
  var val = this.getMVVal();
  Dep.target = null;
  return val;
}

// data项发生变化时更新对应的界面
Watcher.prototype.update = function () {
  var val = this.getMVVal(),
      oldVal = this.val;
  if (val !== oldVal) {
    this.cb(val, oldVal);
    this.val = val;
  }
}

// 获取exp在vm.$data中的值
Watcher.prototype.getMVVal = function () {
  var val = this.$vm.$data,
      exp = this.exp.split('.');
  exp.forEach(function (key) {
    val = val[key];
  });
  return val;
}