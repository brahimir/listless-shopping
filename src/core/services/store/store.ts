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
  SET_USER(context: any, user: any) {
    context.commit("setUser", user);
  }
};

const mutations = {
  setUser(state: any, user: any) {
    state.user = user;
  }
};

export default new Vuex.Store({
  state,
  getters: getters,
  actions: actions,
  mutations: mutations,
  plugins: [createPersistedState()]
});
