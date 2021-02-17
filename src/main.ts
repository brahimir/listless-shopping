// Vue
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// Store
import store from "./core/services/store";
// Vuetify
import vuetify from "./plugins/vuetify";
// Axios
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

// Imports
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  render: (h: (arg0: any) => any) => h(App)
}).$mount("#app");
