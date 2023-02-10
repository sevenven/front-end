// 一个表达式对应一个Watcher实例
function Watcher(vm, exp, updater) {
  this.$vm = vm;
  this.exp = exp;
  this.updater = updater;
  this.val = this.get();
}

// 获取当前表达式对应的值
Watcher.prototype.get = function () {
  // 触发依赖收集
  Dep.target = this;
  var val = this.getMVVal();
  Dep.target = null;
  return val;
}

// Dep中调用
// data项发生变化时更新对应的界面
Watcher.prototype.update = function () {
  var val = this.getMVVal(),
    oldVal = this.val;
  if (val !== oldVal) {
    this.updater(val);
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