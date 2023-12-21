import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "./utils/toast.js";

Vue.config.productionTip = false;
Vue.prototype.$toast = toast;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
