let Vue
// 一个简易的router
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
    // 解析routes
    this.createRouteMap()
    // 监听事件
    this.bindEvents()
    // 声明组件
    this.initComponent()
  }
  // 解析routes
  createRouteMap () {
    this.$options.routes.forEach(route => {
      this.routerMap[route.path] = route
    })
  }
  // 监听事件
  bindEvents () {
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  // hashchange响应函数
  onHashChange () {
    this.app.current = window.location.hash.slice(1) || '/'
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
        // return <a href={'#' + this.to}>{this.$slots.default}</a>
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
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        // 将Router实例挂载到Vue.prototype上
        Vue.prototype.$router = this.$options.router
        // 路由器初始化
        this.$options.router.init()
      }
    }
  })
}

export default VueRouter