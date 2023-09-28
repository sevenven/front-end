// 编译模板
function Compile(el, vm) {
  this.vm = vm;
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
  while (node.firstChild) fragment.append(node.firstChild);
  return fragment;
};

// 编译模板
Compile.prototype.compile = function (node) {
  var childNodes = node.childNodes;
  Array.from(childNodes).forEach((node) => {
    if (this.isElementNode(node)) {
      // 元素节点
      this.compileElement(node);
    } else if (this.isInter(node)) {
      // 文本节点且为大括号表达式
      this.compileText(node);
    }
    // 递归遍历
    if (node.childNodes?.length) this.compile(node);
  });
};

// 编译元素节点
Compile.prototype.compileElement = function (node) {
  var nodeAttrs = node.attributes;
  Array.from(nodeAttrs).forEach((attr) => {
    var attrName = attr.name;
    if (this.isDirective(attrName)) {
      // 判断是否是指令属性
      var dir = attrName.slice(2),
        exp = attr.value;
      if (this.isEventDirective(dir)) {
        // 事件指令
        var eventType = dir.split(":")[1],
          fn = this.vm.$options.methods && this.vm.$options.methods[exp];
        if (eventType && fn)
          node.addEventListener(eventType, fn.bind(this.vm), false);
      } else {
        // 普通指令
        this.update(node, exp, dir);
        if (dir === "model") {
          modalHandle(this.vm, node, exp);
        }
      }
    }
  });
};

// 编译大括号表达式
Compile.prototype.compileText = function (node) {
  this.update(node, RegExp.$1, "text");
};

// 更新
Compile.prototype.update = function (node, exp, dir) {
  var updaterFn = updater[dir + "Updater"];
  // 初始化表达式
  updaterFn && updaterFn(node, getVMVal(this.vm, exp));
  // 创建Watcher实例，负责后续更新
  new Watcher(this.vm, exp, function (val) {
    updaterFn && updaterFn(node, val);
  });
};

// 判断是否是元素节点
Compile.prototype.isElementNode = function (node) {
  return node.nodeType === 1;
};

// 判断是否是文本节点
Compile.prototype.isTextNode = function (node) {
  return node.nodeType === 3;
};

// 判断是否是大括号表达式
Compile.prototype.isInter = function (node) {
  var text = node.textContent,
    reg = /\{\{(.*)\}\}/;
  return this.isTextNode(node) && reg.test(text);
};

// 判断是否是指令属性
Compile.prototype.isDirective = function (attr) {
  return attr.indexOf("v-") === 0;
};

// 判断是否是事件指令
Compile.prototype.isEventDirective = function (dir) {
  return dir.indexOf("on") === 0;
};

// 节点更新方法合集
var updater = {
  // text
  textUpdater(node, val) {
    node.textContent = val;
  },
  // html
  htmlUpdater(node, val) {
    node.innerHTML = val;
  },
  // class
  classUpdater(node, val, oldVal) {
    var className = node.className.replace(oldVal, "").replace(/\s$/, ""),
      space = className && val ? " " : "";
    node.className = className + space + val;
  },
  // model
  modelUpdater(node, val) {
    node.value = typeof val === undefined ? "" : val;
  },
};

const modalHandle = (vm, node, exp) => {
  var val = getVMVal(vm, exp);
  node.addEventListener(
    "input",
    (e) => {
      var newVal = e.target.value;
      if (newVal !== val) {
        val = newVal;
        setVMVal(vm, exp, val);
      }
    },
    false
  );
};
