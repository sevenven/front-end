import router from "./router";
import store from "./store";

const whiteList = ["/home", "/login"]; // 无需令牌白名单

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  // 获取令牌判断用户是否登录
  const hasToken = localStorage.getItem("token");

  // 已登录
  if (hasToken) {
    if (to.path === "/login") {
      // 若已登录没有必要显示登录页，重定向至首页
      next({ path: "/" });
    } else {
      // 去其他路由，暂时放过
      //   next()
      // 接下来执行用户角色逻辑, todo
      //   1.判断用户是否拥有角色
      const hasRoles =
        store.state.user.roles && store.state.user.roles.length > 0;

      if (hasRoles) {
        next();
      } else {
        // 2.获取用户角色
        const roles = await store.dispatch("user/getInfo");

        const accessRoutes = await store.dispatch("permission/generateRoutes", roles);

        //   动态添加路由到路由器
        router.addRoutes(accessRoutes);

        // 跳转
        next({ ...to });
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中路由放过
      next();
    } else {
      // 重定向至登录页
      next(`/login?redirect=${to.path}`);
    }
  }
});
