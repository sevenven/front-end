// data代理入口
function observe (data) {
  if (!data || Object.prototype.toString.call(data) !== '[object Object]') return;
  new Observer(data);
}

function Observer (data) {
  var ob = this;
  // 遍历代理data
  Object.keys(data).forEach(function (key) {
    ob.defineReactive(data, key, data[key]);
  })
}

// 代理data的每一项，实现数据响应式监听
Observer.prototype.defineReactive = function (data, key, val) {
  observe(val); // 间接递归
  var dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    get () {
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set (newVal) {
      if (newVal != val) {
        val = newVal;
        dep.notify();
      }
    }
  })
}

// data的每一项对应一个Dep实例
function Dep () {
  this.subs = []; // 存放订阅当前Dep实例对应的data项变化的Watcher实例
}

// 存放订阅当前正在订阅data项变化的Watcher实例
Dep.target = null;

// 依赖收集
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
}

// 派发更新
Dep.prototype.notify = function () {
  this.subs.forEach(function (sub) {
    sub.update();
  })
}