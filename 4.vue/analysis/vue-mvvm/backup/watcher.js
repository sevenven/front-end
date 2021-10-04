// 一个exp对应一个Watcher实例
function Watcher (vm, exp, cb) {
  this.$vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.val = this.get(); // 获取当前表达式对应的值
}

// 获取当前表达式对应的值
Watcher.prototype.get = function () {
  Dep.target = this;
  var val = this.getVMval();
  Dep.target = null;
  return val;
}

// 更新界面
Watcher.prototype.update = function () {
  var val = this.getVMval(),
      oldVal = this.val;
  if (val !== oldVal) {
    this.cb.call(this.$vm, val, oldVal);
    this.val = val;
  }
}

// 获取exp在vm.$data中的值
Watcher.prototype.getVMval = function () {
  var val = this.$vm.$data,
      exp = this.exp.split('.');
  exp.forEach(function (key) {
    val = val[key];
  });
  return val;
}