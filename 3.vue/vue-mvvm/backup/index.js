// 实现一个简单的MVVM框架 1.数据代理 2.双向数据绑定 3.模板编译

function MVVM (options) {
  this.$options = options;
  this.$data = options.data;
  var vm = this;

  // 在vm上代理data的属性
  Object.keys(this.$data).forEach(function (key) {
    vm._proxy(key)
  })

  // 代理data每一层的每一个属性，监听数据变化
  observe(this.$data);

  // 编译模板
  new Compile(options.el || document.body, this);
}

// 在vm上代理data的属性
MVVM.prototype._proxy = function (key) {
  Object.defineProperty(this, key, {
    configurable: false,
    enumerable: true,
    get: function () {
      return this.$data[key];
    },
    set: function (newVal) {
      this.$data[key] = newVal;
    }
  })
}