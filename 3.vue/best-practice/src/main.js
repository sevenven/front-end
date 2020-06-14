import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import './icons/index'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, // 配置router实例
  store,
}).$mount('#app')
