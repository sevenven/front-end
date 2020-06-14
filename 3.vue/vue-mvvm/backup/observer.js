// 代理data入口
function observe (data) {
  if (!data || Object.prototype.toString.call(data) !== '[object Object]') return;
  return new Observer(data);
}

// 代理data每一层的每一个属，实现数据变化
function Observer(data) {
  var ob = this;
  Object.keys(data).forEach(function (key) {
    ob.defineReacttive(data, key, data[key]);
  });
}

// 代理指定属性，实现数据响应式绑定
Observer.prototype.defineReacttive = function (data, key, val) {
  var dep = new Dep();
  observe(val); // 间接递归
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: true,
    get: function () {
      Dep.target && dep.addSub(Dep.target); // 依赖收集
      return val;
    },
    set: function (newVal) {
      if (val !== newVal) {
        val = newVal;
        observe(newVal); // 监听新值
        dep.notify(); // 派发更新
      }
    }
  });
}

var uid = 0;

// data每一层的每一个属性对应一个Dep实例
function Dep () {
  this.id = uid++; // Dep实例的唯一标识
  this.subs = []; // 存放订阅者
}

// 存放当前的Watcher实例
Dep.target = null;

// 添加订阅者
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
}

// 派发更新
Dep.prototype.notify = function () {
  this.subs.forEach(function (sub) {
    sub.update();
  })
}