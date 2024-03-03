import Vue from 'vue'
// import Router from 'vue-router'
import Router from './imitation/vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      children: [{
        path: '/about/elform',
        name: 'elform',
        component: () => import('./views/ELForm.vue'),
      }]
    },
    {
      path: '/elform',
      name: 'elform',
      component: () => import('./views/ELForm.vue'),
    }
  ]
})
