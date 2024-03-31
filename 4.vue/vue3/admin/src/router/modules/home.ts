export default {
	path: '/',
	name: 'Layout',
	redirect: '/',
	component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
	meta: {
		role: ['common', 'admin'],
		parentRouter: 'Home'
	},
	children: [
		{
			path: '/',
			name: 'HomePage',
			component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
			meta: {
				isShow: true,
				title: '默认首页',
				parentRouter: 'Layout'
			}
		},
		{
			path: '/project',
			name: 'projectPage',
			component: () => import(/* webpackChunkName: "project" */ '@/views/Project/index.vue'),
			meta: {
				isShow: true,
				title: '项目模块',
				parentRouter: 'Layout'
			}
		},
		{
			path: '/user',
			name: 'UserPage',
			component: () => import(/* webpackChunkName: "user" */ '@/views/User/index.vue'),
			meta: {
				title: '用户模块',
				isShow: true,
				parentRouter: 'Layout'
			}
		},
		{
			path: '/role',
			name: 'RolePage',
			component: () => import(/* webpackChunkName: "role" */ '@/views/Role/index.vue'),
			meta: {
				title: '角色模块',
				isShow: true,
				parentRouter: 'Layout'
			}
		},
		{
			path: '/auth',
			name: 'AuthPage',
			component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth/index.vue'),
			meta: {
				title: '权限模块',
				isShow: true,
				parentRouter: 'Layout'
			}
		},
		{
			path: '/menu',
			name: 'MenuPage',
			meta: {
				isShow: true,
				title: '一级菜单',
				parentRouter: 'Layout'
			},
			children: [
				{
					path: '/menu/sub1',
					name: 'SubMenuPage1',
					meta: {
						isShow: true,
						title: '二级菜单1',
						parentRouter: 'MenuPage'
					}
				},
				{
					path: '/menu/sub2',
					name: 'SubMenuPage2',
					meta: {
						isShow: true,
						title: '二级菜单2',
						parentRouter: 'MenuPage'
					}
				},
				{
					path: '/menu/sub3',
					name: 'SubMenuPage3',
					meta: {
						isShow: true,
						title: '二级菜单3',
						parentRouter: 'MenuPage'
					}
				}
			]
		}
	]
};
