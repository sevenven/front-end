import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home/index.vue'
import Login from '../views/Login/index.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home,
  }, {
    path: '/login',
    component: Login
  }]
});
