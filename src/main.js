import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import i18n from "./lang/i18n";
Vue.use(Vuelidate);

Vue.config.productionTip = false;

export default new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
