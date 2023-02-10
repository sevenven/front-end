// 编译模板
function Compile(el, vm) {
  this.$vm = vm;
  let root = document.querySelector(el);
  if (root) {
    var fragment = this.node2Fragement(root);
    this.compile(fragment);
    root.appendChild(fragment);
  }
}

// 将节点转化为fragment
Compile.prototype.node2Fragement = function (node) {
  var fragment = document.createDocumentFragment();
  while (node.firstChild)
    fragment.append(node.firstChild);
  return fragment;
}

// 编译模板
Compile.prototype.compile = function (node) {
  var childNodes = node.childNodes
  Array.from(childNodes).forEach((node) => {
    var text = node.textContent,
      reg = /\{\{(.*)\}\}/;
    if (this.isElementNode(node)) { // 元素节点
      this.compileElement(node)
    } else if (this.isTextNode(node) && reg.test(text)) { // 文本节点且为大括号表达式
      this.compileText(node, RegExp.$1);
    }
    // 递归遍历
    if (node.childNodes && node.childNodes.length)
      this.compile(node);
  })
}

// 编译元素节点
Compile.prototype.compileElement = function (node) {
  var nodeAttrs = node.attributes
  Array.from(nodeAttrs).forEach((attr) => {
    var attrName = attr.name;
    if (this.isDirective(attrName)) { // 判断是否是指令属性
      var dir = attrName.slice(2),
        exp = attr.value;
      if (this.isEventDirective(dir)) { // 事件指令
        compileUtil.eventHandle(this.$vm, node, exp, dir)
      } else { // 普通指令
        compileUtil[dir](this.$vm, node, exp);
      }
    }
  })
}

// 编译文本节点
Compile.prototype.compileText = function (node, exp) {
  compileUtil.text(this.$vm, node, exp);
}

// 判断是否是元素节点
Compile.prototype.isElementNode = function (node) {
  return node.nodeType === 1;
}

// 判断是否是文本节点
Compile.prototype.isTextNode = function (node) {
  return node.nodeType === 3;
}

// 判断是否是指令属性
Compile.prototype.isDirective = function (attr) {
  return attr.indexOf('v-') === 0;
}

// 判断是否是事件指令
Compile.prototype.isEventDirective = function (dir) {
  return dir.indexOf('on') === 0;
}

// 指令操作方法合集
var compileUtil = {
  // v-text
  text: function (vm, node, exp) {
    this.update(vm, node, exp, 'text');
  },
  // v-html
  html: function (vm, node, exp) {
    this.update(vm, node, exp, 'html');
  },
  // v-class
  class: function (vm, node, exp) {
    this.update(vm, node, exp, 'class');
  },
  // v-model
  model: function (vm, node, exp) {
    this.update(vm, node, exp, 'model');
    var val = this._getVMVal(vm, exp),
      util = this;
    node.addEventListener('input', (e) => {
      var newVal = e.target.value;
      if (newVal !== val) {
        val = newVal;
        this._setVMVal(vm, exp, val);
      }
    }, false);
  },
  // v-on
  eventHandle: function (vm, node, exp, dir) {
    var eventType = dir.split(':')[1],
      fn = vm.$options.methods && vm.$options.methods[exp];
    if (eventType && fn)
      node.addEventListener(eventType, fn.bind(vm), false);
  },
  // update
  update: function (vm, node, exp, dir) {
    var updaterFn = updater[dir + 'Updater'];
    // 初始化表达式
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));
    // 创建Watcher实例，负责后续更新
    new Watcher(vm, exp, function (val) {
      updaterFn && updaterFn(node, val);
    })
  },
  // 获取exp在vm.$data中对应的值
  _getVMVal: function (vm, exp, newVal) {
    var val = vm.$data;
    exp = exp.split('.');
    exp.forEach(function (key, index) {
      val = val[key];
    });
    return val;
  },
  // 设置exp在vm.$data中对应的值
  _setVMVal: function (vm, exp, newVal) {
    var val = vm.$data;
    exp = exp.split('.');
    exp.forEach(function (key, index) {
      if (index < exp.length - 1)
        val = val[key];
      else
        val[key] = newVal
    })
  }
}

// 节点更新方法合集
var updater = {
  // text
  textUpdater: function (node, val) {
    node.textContent = val;
  },
  // html
  htmlUpdater: function (node, val) {
    node.innerHTML = val;
  },
  // class
  classUpdater: function (node, val, oldVal) {
    var className = node.className.replace(oldVal, '').replace(/\s$/, ''),
      space = className && val ? ' ' : '';
    node.className = className + space + val;
  },
  // model
  modelUpdater: function (node, val) {
    node.value = typeof val === undefined ? '' : val;
  }
}