// Vue
import Vue from "vue";
// Vuex
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

import auth from "./auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [
    createPersistedState({
      getState: key => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })
  ]
});
