let Vue;
// 一个简易的vue-router实现
class VueRouter {
  constructor(options) {
    this.$options = options
    // 实现响应式的url
    this.current = window.location.hash.slice(1) || '/';
    Vue.util.defineReactive(this, 'matched', []);
    this.match();
  }
  // 初始化
  init() {
    // 监听事件
    this.bindEvents()
    // 声明组件
    this.initComponent()
  }
  match(routes) {
    routes = routes || this.$options.routes;
    for (let route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route);
        return;
      }
      if (route.path !== '/' && this.current.indexOf(route.path) != -1) {
        this.matched.push(route);
        if (route.children) {
          this.match(route.children);
        }
        return;
      }
    }
  }
  // 监听事件
  bindEvents() {
    window.addEventListener('hashchange', this.onHashChange.bind(this), false)
  }
  // hashchange响应函数
  onHashChange() {
    this.current = window.location.hash.slice(1) || '/';
    this.matched = [];
    this.match();
  }
  // 声明组件
  initComponent() {
    // router-link组件
    Vue.component('router-link', {
      props: {
        to: {
          type: String,
          require: true
        }
      },
      render(h) {
        // vue-cli环境下有jsx配置
        // return <a href={'#' + this.to}>{this.$slots.default}</a>
        return h('a', {
          attrs: { href: '#' + this.to }
        }, [this.$slots.default])
      }
    })
    // router-view组件
    Vue.component('router-view', {
      render(h) {
        this.$vnode.data.routerView = true;
        let depth = 0;
        let parent = this.$parent;
        while (parent) {
          const vnodeData = parent.$vnode && parent.$vnode.data;
          if (vnodeData && vnodeData.routerView) {
            depth++;
          }
          parent = parent.$parent;
        }
        let component = null;
        let route = this.$router.matched[depth];
        if(route) {
          component = route.component;
        }
        return h(component)
      }
    })
  }
}

// Vue.use()的时候会调用插件的install()
VueRouter.install = function (_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
        this.$options.router.init();
      }
    }
  })
}

export default VueRouter;