class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    // 1.为$data做代理
    proxy(this, "$data");
    // 2.将data做响应式处理
    observe(this.$data);
    if (options.el) {
      this.$mount(options.el);
    }
  }

  $mount(el) {
    this.$el = document.querySelector(el);
    // 设置组件更新函数
    const updateComponent = () => {
      const vnode = this.$options.render.call(this, this.$createElement);
      this._update(vnode);
    };
    // 创建组件对应的watcher的实例
    new Watcher(this, updateComponent);
  }

  $createElement(tag, data, children) {
    return {
      tag,
      data,
      children,
    };
  }

  _update(vnode) {
    const prevVnode = this._vnode;
    if (!prevVnode) {
      // 初始化操作
      this.__patch__(this.$el, vnode);
    } else {
      // 更新操作
      this.__patch__(prevVnode, vnode);
    }
    this._vnode = vnode;
  }

  __patch__(oldVnode, vnode) {
    if (oldVnode.nodeType) {
      const parent = oldVnode.parentElement;
      const refElm = oldVnode.nextSibling;
      const el = this.createElm(vnode);
      parent.insertBefore(el, refElm);
      parent.removeChild(oldVnode);
    } else {
      const el = (vnode.el = oldVnode.el);
      if (oldVnode.tag === vnode.tag) {
        const oldCh = oldVnode.children;
        const newCh = vnode.children;
        if (typeof newCh === "string") {
          if (typeof oldCh === "string") {
            // 双方都是text且不相等
            if (newCh !== oldCh) {
              el.textContent = newCh;
            }
          } else {
            // oldCh是element数组, newCh是text
            el.textContent = newCh;
          }
        } else {
          if (typeof oldCh === "string") {
            // oldCh是string newCh是element
            el.innerHTML = "";
            newCh.forEach((child) => el.appendChild(this.createElm(child)));
          } else {
            // 双方均是element数组
            this.updateChildren(el, oldCh, newCh);
          }
        }
      } else {
      }
      // this.createElm(vnode);
    }
  }

  // 递归创建dom元素
  createElm(vnode) {
    const el = document.createElement(vnode.tag);
    // props--todo
    if (vnode.children) {
      if (typeof vnode.children === "string") {
        el.textContent = vnode.children;
      } else {
        vnode.children.forEach((vnode) => {
          el.appendChild(this.createElm(vnode));
        });
      }
    }
    // 建立vnode和el之间的关系，未来更新需要使用
    vnode.el = el;
    return el;
  }

  updateChildren(parentElm, oldCh, newCh) {
    const len = Math.min(oldCh.length, newCh.length);
    for (let i = 0; i < len; i++) {
      this.__patch__(oldCh[i], newCh[i]);
    }
    if (newCh.length > oldCh.length) {
      // 需要新增元素
      newCh
        .slice(len)
        .forEach((child) => parentElm.appendChild(this.createElm(child)));
    } else if (newCh.length < oldCh.length) {
      // 需要删除元素
      oldCh.slice(len).forEach((child) => parentElm.removeChild(child.el));
    }
  }
}

// proxy代理函数：让⽤户可以直接访问data中的key
function proxy(vm, key) {
  Object.keys(vm[key]).forEach((k) => {
    Object.defineProperty(vm, k, {
      get() {
        return vm[key][k];
      },
      set(v) {
        vm[key][k] = v;
      },
    });
  });
}

// 遍历指定数据对象每个key，拦截他们
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  // 每遇到⼀个对象，就创建⼀个Observer实例
  // 创建⼀个Observer实例去做拦截操作
  new Observer(obj);
}

// 实现KVue构造函数
function defineReactive(obj, key, val) {
  // 如果val是对象，需要递归处理之
  observe(val);
  // 管家创建
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        // 如果newVal是对象，也要做响应式处理
        observe(newVal);
        val = newVal;
        // 通知更新;
        dep.notify();
      }
    },
  });
}

// 根据传⼊value类型做不同操作
class Observer {
  constructor(value) {
    this.value = value;
    // 判断⼀下value类型
    // 遍历对象
    this.walk(value);
  }
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

// 管家：和某个key，⼀⼀对应，管理多个秘书，数据更新时通知他们做更新⼯作
class Dep {
  constructor() {
    this.deps = new Set();
  }
  addDep(watcher) {
    this.deps.add(watcher);
  }
  notify() {
    this.deps.forEach((watcher) => watcher.update());
  }
}

class Watcher {
  constructor(vm, updaterFn) {
    this.vm = vm;
    this.updaterFn = updaterFn;
    this.get();
  }
  get() {
    // 依赖收集触发
    Dep.target = this;
    this.updaterFn();
    Dep.target = null;
  }
  update() {
    this.get.call(this);
  }
}
