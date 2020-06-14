import Vue from 'vue'
import App from './App.vue'
import toast from './utils/toast.js'

Vue.config.productionTip = false;
Vue.prototype.$toast = toast;

// 全局注册异步加载的组件 
// 用于调试学习异步组件

// 工厂函数创建异步组件方式
Vue.component('ElForm', function (resolve) {
  require(['./components/ElForm.vue'], function (res) {
    resolve(res);
  })
})

Vue.component('ElFormItem', function (resolve) {
  require(['./components/ElFormItem.vue'], function (res) {
    resolve(res);
  })
})

Vue.component('ElInput', function (resolve) {
  require(['./components/ElInput.vue'], function (res) {
    resolve(res);
  })
})

Vue.component('ElButton', function (resolve) {
  require(['./components/ElButton.vue'], function (res) {
    resolve(res);
  })
})

new Vue({
  render: h => h(App),
}).$mount('#app');