let Vue

// 一个简易的Store
class Store {
  constructor (options) {
    // 持有state并使其响应化
    this.state = new Vue({ data: options.state });
    // this._vm = new Vue({
    //   data: {
    //     $$state: options.state
    //   }
    // })
    this.actions = options.actions;
    this.mutations = options.mutations;
    // 处理getters
    options.getters && this.handleGetters(options.getters);
    // 防止this丢失
    this.dispatch = this.dispatch.bind(this);
    this.commit = this.commit.bind(this);
  }
  // get state() {
  //   return this._vm._data.$$state
  // }
  // set state(val) {
  //   console.error('plese use replaceState to reset state')
  // }
  // 派发action的函数
  dispatch (type, payload) {
    return this.actions[type](this, payload);
  }
  // 更新state的函数
  commit (type, payload) {
    this.mutations[type](this.state, payload);
  }
  // 在this.getters上代理getters
  handleGetters (getters) {
    var _this = this;
    this.getters = {};
    Object.keys(getters).forEach(function (key) {
      Object.defineProperty(_this.getters, key, {
        get() {
          return getters[key](_this.state);
        }
      })
    })
  }
}

function install (_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store)
        Vue.prototype.$store = this.$options.store
    }
  })
}

export default {
  Store,
  install
}