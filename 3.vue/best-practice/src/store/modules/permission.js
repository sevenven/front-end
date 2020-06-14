// 导入asyncRoutes，过滤它看当前用户是否拥有响应权限
import {asyncRoutes, constRoutes} from '@/router'

const state = {
    routes: [], // 完整路由
    addRoutes: [], // 权限路由
}

const mutations = {
    // routes: 用户可访问的权限路由
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;
        state.routes = constRoutes.concat(routes);
    }
}

const actions = {
    generateRoutes({commit}, roles) {
        // 过滤出能访问的路由表
        const routes = filterAsyncRoutes(asyncRoutes, roles)
        commit('SET_ROUTES', routes)
        return routes;
    }
}

function filterAsyncRoutes(routes, roles) {
    const res = [];

    routes.forEach(route => {
        // 复制一份路由
        const tmp = {...route};
        // 拥有访问权限
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                // 递归子路由
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }

            res.push(tmp);
        }        
    })

    return res;
}

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        // 路由定义中没有roles选项，则不需要权限即可访问
        return true;
    }
}

export default {
    namespaced: true, 
    state,
    mutations,
    actions
}