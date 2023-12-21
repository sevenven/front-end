let Vue;
// 一个简易的vue-router实现
class VueRouter {
  constructor(options) {
    this.$options = options;
    this.current = window.location.hash.slice(1) || "/";
    Vue.util.defineReactive(this, "matched", []);
  }
  // 初始化
  init() {
    // 递归遍历路由 获得匹配的组件数组
    this.match();
    // 监听事件
    this.bindEvents();
    // 声明组件
    this.initComponent();
  }

  // 递归遍历路由 获得匹配的组件数组
  match(routes) {
    routes = routes || this.$options.routes;
    for (const route of routes) {
      if (route.path === "/" && this.current === "/")
        return this.matched.push(route);
      if (route.path !== "/" && this.current.indexOf(route.path) > -1) {
        this.matched.push(route);
        if (route.children) this.match(route.children);
      }
    }
  }
  // 监听事件
  bindEvents() {
    window.addEventListener("hashchange", this.onHashChange.bind(this), false);
  }
  // hashchange响应函数
  onHashChange() {
    this.current = window.location.hash.slice(1) || "/";
    this.matched = [];
    this.match();
  }
  // 声明组件
  initComponent() {
    // router-link组件
    Vue.component("router-link", {
      props: {
        to: {
          type: String,
          require: true,
        },
      },
      render(h) {
        // vue-cli环境下有jsx配置---当前是vue-cli4创建的项目
        // return <a href={'#' + this.to}>{this.$slots.default}</a>
        return h(
          "a",
          {
            attrs: { href: "#" + this.to },
          },
          [this.$slots.default]
        );
      },
    });
    // router-view组件
    Vue.component("router-view", {
      render(h) {
        this.$vnode.data.routerView = true;
        let depth = 0;
        let parent = this.$parent;
        while (parent) {
          const vnodeData = parent.$vnode?.data;
          if (vnodeData?.routerView) {
            depth++;
          }
          parent = parent.$parent;
        }

        let { matched } = this.$router;
        let curRoute = matched[depth];
        const component = curRoute?.component || null;
        return h(component);
      },
    });
  }
}

// _Vue: Vue的构造函数
// Vue.use()的时候会调用插件的install()
VueRouter.install = function(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      // 只需要在根实例时执行一次
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    },
  });
};

export default VueRouter;
