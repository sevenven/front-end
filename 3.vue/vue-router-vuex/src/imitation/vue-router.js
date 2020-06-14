let Vue;
// 一个简易的vue-router实现
class VueRouter {
  constructor (options) {
    this.$options = options
    // 路由hash表
    this.routerMap = {}
    // 实现响应式的url
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  // 初始化
  init () {
    // 解析routers
    this.createRouterMap()
    // 监听事件
    this.bindEvents()
    // 声明组件
    this.initComponent()
  }
  // 解析routers
  createRouterMap () {
    this.$options.routes.forEach((router) => {
      this.routerMap[router.path] = router
    })
  }
  // 监听事件
  bindEvents () {
    window.addEventListener('hashchange', this.onHashChange.bind(this), false)
  }
  // hashchange响应函数
  onHashChange () {
    this.app.current = window.location.hash.slice(1);
  }
  // 声明组件
  initComponent () {
    // router-link组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: { href: '#' + this.to }
        }, [this.$slots.default])
      }
    })
    // router-view组件
    Vue.component('router-view', {
      functional: true,
      render(h, {parent}) {
        const router = parent.$router
        const component = router.routerMap[router.app.current].component
        return h(component)
      }
    })
  }
}

// Vue.use()的时候会调用插件的install()
VueRouter.install = function (_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
        this.$options.router.init();
      }
    }
  })
}

export default VueRouter;