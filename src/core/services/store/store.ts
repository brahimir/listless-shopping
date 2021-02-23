import { User } from "@/core/_models/user.model";
import AuthService from "@/core/services/auth.service";
// Vue
import Vue from "vue";
// Store
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
  user: null
};

const getters = {
  currentUser: (state: any) => {
    return state.user;
  }
};

const actions = {
  LOGIN(context: any, user: any) {
    context.commit("login", user);
  },
  LOGOUT(context: any) {
    context.commit("logout");
  }
};

const mutations = {
  login(state: any, user: any) {
    state.user = user;
  },
  logout(state: any) {
    state.user = null;
  }
};

export default new Vuex.Store({
  state,
  getters: getters,
  actions: actions,
  mutations: mutations,
  plugins: [createPersistedState()]
});
