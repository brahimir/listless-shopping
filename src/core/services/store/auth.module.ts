// Vue
import Vue from "vue";
import Vuex from "vuex";
// Models
import { User } from "@/core/_models/user.model";
// Services
import AuthService from "@/core/services/store/auth.service";
import JwtService from "@/core/services/jwt.service";

Vue.use(Vuex);

// action types
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";

// mutation types
export const PURGE_AUTH = "purgeAuth";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser: function(state: any) {
    return state.user;
  },
  isAuthenticated: function(state: any) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context: any, credentials: any) {
    return new Promise(resolve => {
      AuthService.login(credentials)
        .then((user: User) => {
          context.commit(SET_AUTH, user);
          resolve(user);
        })
        .catch((response: any) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [LOGOUT](context: any) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context: any, user: User) {
    return new Promise(resolve => {
      AuthService.register(user)
        .then((user: User) => {
          console.log(user);
          context.commit(SET_AUTH, user);
          resolve(user);
        })
        .catch((response: any) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  }
};

const mutations = {
  [SET_ERROR](state: any, error: any) {
    state.errors = error;
  },
  [SET_AUTH](state: any, user: User) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.authToken);
  },
  [PURGE_AUTH](state: any) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
