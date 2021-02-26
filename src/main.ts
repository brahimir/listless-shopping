// Vue
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// Store
import store from "./core/services/store/store";
// Vuetify
import vuetify from "./plugins/vuetify";
// Axios
import axios from "axios";
import VueAxios from "vue-axios";
// Bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

// Imports
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  vuetify,
  render: (h: (arg0: any) => any) => h(App)
}).$mount("#app");
