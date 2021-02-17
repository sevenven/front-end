// 编译模板
function Compile (el, vm) {
  this.$vm = vm;
  el = this.isNodeElement(el) ? el : document.querySelector(el);
  if (el) {
    var fragment = this.node2Fragment(el); // 将node转换为fragment
    this.compileElement(fragment); // 编译模板
    el.appendChild(fragment); // 将编译好的模板添加到页面
  }
}

// 将node转换为fragment
Compile.prototype.node2Fragment = function (node) {
  var fragment = document.createDocumentFragment();
  while (node.firstChild) 
    fragment.appendChild(node.firstChild);
  return fragment;
}

// 编译模板
Compile.prototype.compileElement = function (fragment) {
  var childNodes = fragment.childNodes,
      cmpl = this;
  Array.prototype.slice.call(childNodes).forEach(function (node) {
    var text = node.textContent,
        reg = /\{\{(.*)\}\}/;
    if (cmpl.isNodeElement(node)) // 元素节点
      cmpl.compile(node);
    else if (cmpl.isTextElement(node) && reg.test(text)) // 文本节点且为大括号表达式
      cmpl.compileText(node, RegExp.$1);
    if (node.childNodes && node.childNodes.length) 
      cmpl.compileElement(node); // 递归编译
  })
} 

// 编译元素节点
Compile.prototype.compile = function (node) {
  var nodeAttrs = node.attributes,
      cmpl = this;
  Array.prototype.slice.call(nodeAttrs).forEach(function (attr) {
    var attrName = attr.name;
    if (cmpl.isDirective(attrName)) {
      var dir = attrName.slice(2),
          exp = attr.value;
      if (cmpl.isEventDeractive(dir)) // 事件指令
        compileUtil.evendHandle(cmpl.$vm, node, exp, dir);
      else // 一般指令
        compileUtil[dir] && compileUtil[dir](cmpl.$vm, node, exp);
      node.removeAttribute(attrName);
    }
  })
}

// 编译文本节点
Compile.prototype.compileText = function (node, exp) {
  compileUtil.text(this.$vm, node, exp);
}

// 判断是否是指令
Compile.prototype.isDirective = function (attr) {
  return attr.indexOf('v-') === 0;
}

// 判断是否是事件指令
Compile.prototype.isEventDeractive = function (dir) {
  return dir.indexOf('on') === 0;
}

// 判断是否是元素节点
Compile.prototype.isNodeElement = function (node) {
  return node.nodeType === 1;
}

// 判断是否是文本节点
Compile.prototype.isTextElement = function (node) {
  return node.nodeType === 3;
}

// 指令操作方法合集
var compileUtil = {
  // v-text
  text: function (vm, node, exp) {
    this.bind(vm, node, exp, 'text');
  },
  // v-html
  html: function (vm, node, exp) {
    this.bind(vm, node, exp, 'html');
  },
  // v-class
  class: function (vm, node, exp) {
    this.bind(vm, node, exp, 'class');
  },
  // v-model
  model: function (vm, node, exp) {
    this.bind(vm, node, exp, 'model');
    var val = this._getVMVal(vm, exp),
        util = this;
    node.addEventListener('input', function (e) {
      var newVal = e.target.value;
      if (val === newVal) return;
      util._setVMVal(vm, exp, newVal);
      val = newVal;
    }, false)
  },
  // v-on
  evendHandle: function (vm, node, exp, dir) {
    var eventType = dir.split(':')[1],
        fn = vm.$options.methods && vm.$options.methods[exp];
    if (eventType && fn) 
      node.addEventListener(eventType, fn.bind(vm), false);
  },
  // bind
  bind: function (vm, node, exp, dir) {
    var updaterFn = updater[dir + 'Updater'];
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));
    // 为表达式创建一个Watcher实例 实现节点的更新显示
    new Watcher(vm, exp, function (val, oldVal) {
      updaterFn && updaterFn(node, val, oldVal);
    });
  },
  // 获取exp在vm.$data中对应的值
  _getVMVal: function (vm, exp) {
    var val = vm.$data;
    exp = exp.split('.');
    exp.forEach(function (key) {
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
        val[key] = newVal;
    });
  }
}

// 更新节点方法合集
var updater = {
  // text
  textUpdater: function (node, val) {
    node.textContent = typeof val == 'undefined' ? '' : val;
  },
  // html
  htmlUpdater: function (node, val) {
    node.innerHTML = typeof val == 'undefined' ? '' : val;
  },
  // class
  classUpdater: function (node, val, oldVal) {
    var className = node.className.replace(oldVal, '').replace(/\s$/, ''),
        space = className && val ? ' ' : '';
    node.className = className + space + val;
  },
  // model
  modelUpdater: function (node, val) {
    node.value = typeof val == 'undefined' ? '' : val;
  }
}