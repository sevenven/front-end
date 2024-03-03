let Vue;

// 一个简易的Store
class Store {
  constructor(options) {
    // 持有state并使其响应化
    this.state = new Vue({ data: options.state });
    this.actions = options.actions;
    this.mutations = options.mutations;
    // 处理getters
    options.getters && this.handleGetters(options.getters);
    // 防止this丢失
    this.dispatch = this.dispatch.bind(this);
    this.commit = this.commit.bind(this);
  }
  // 派发action的dispatch方法
  dispatch(type, param) {
    return this.actions[type](this, param);
  }
  // 修改数据的commit方法
  commit(type, param) {
    this.mutations[type](this.state, param);
  }
  // 处理getters
  handleGetters(getters) {
    var _this = this;
    this.getters = {};
    Object.keys(getters).forEach(function(key) {
      Object.defineProperty(_this.getters, key, {
        get() {
          return getters[key](_this.state);
        },
      });
    });
  }
}

// Vue.use('插件名')的时候会调用插件的install()
function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        // 将Store实例挂载大奥Vue.prototype上
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default {
  Store,
  install,
};
