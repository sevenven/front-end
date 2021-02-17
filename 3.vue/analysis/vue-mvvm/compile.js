// 编译模板
function Compile (el, vm) {
  this.$vm = vm;
  el = document.querySelector(el);
  if (el) {
    var fragment = this.node2Fragement(el);
    this.compile(fragment);
    el.appendChild(fragment);
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
  var childNodes = node.childNodes,
      cmpl = this;
  Array.prototype.slice.call(childNodes).forEach(function (node) {
    var text = node.textContent,
        reg = /\{\{(.*)\}\}/;
    if (cmpl.isElementNode(node)) // 元素节点
      cmpl.compileElement(node)
    else if (cmpl.isTextNode(node) && reg.test(text)) // 文本节点且为大括号表达式
      cmpl.compileText(node, RegExp.$1);
    if (node.childNodes && node.childNodes.length) 
      cmpl.compile(node);
  })
}

// 编译元素节点
Compile.prototype.compileElement = function (node) {
  var nodeAttrs = node.attributes,
      cmpl = this;
  Array.prototype.slice.call(nodeAttrs).forEach(function (attr) {
    var attrName = attr.name;
    if (cmpl.isDirective(attrName)) { // 判断是否是指令属性
      var dir = attrName.slice(2),
          exp = attr.value;
      if (cmpl.isEventDirective(dir)) // 事件指令
        compileUtil.eventHandle(cmpl.$vm, node, exp, dir)
      else // 普通指令
        compileUtil[dir](cmpl.$vm, node, exp);
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
      if (newVal !== val) {
        val = newVal;
        util._setVMVal(vm, exp, val);
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
  // bind
  bind: function (vm, node, exp, dir) {
    var updaterFn = updater[dir + 'Updater'];
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));
    new Watcher(vm, exp, function (val, oldVal) {
      updaterFn && updaterFn(node, val, oldVal);
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