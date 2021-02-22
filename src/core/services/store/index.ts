// Vue
import Vue from "vue";
// Vuex
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// Modules
import auth from "./auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [createPersistedState()]
});
