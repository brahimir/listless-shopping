// Vue
import Vue from "vue";
import VueAxios from "vue-axios";
// Constants
import { API_ROUTES } from "@/.env/api-routes";
import { AUTH_TYPE } from "@/.env/api-routes";
// Models
import { User } from "@/core/_models/user.model";
// Axios
import axios from "axios";

// API Routes
const REGISTER_USER = API_ROUTES.AUTH.USER.REGISTER;
const LOGIN_USER = API_ROUTES.AUTH.USER.LOGIN;
const LOGOUT_USER = API_ROUTES.AUTH.USER.LOGOUT;
const GET_USER_FROM_TOKEN = API_ROUTES.AUTH.USER.FROM_TOKEN;

const AuthService = {
  init() {
    Vue.use(VueAxios, axios);
  },

  login(credentials: any): Promise<any> {
    return axios
      .post(LOGIN_USER, credentials)
      .then((res: any) => {
        if (!res.data.user) {
          return;
        }
        return res.data.user;
      })
      .catch((err: any) => {
        // todo
        console.log(err);
      });
  },

  logout(userId: string): Promise<any> {
    const body: any = {
      _id: userId
    };
    return axios
      .post(LOGOUT_USER, body)
      .then((res: any) => {
        if (!res.data.isLoggedOut) {
          // todo
          console.log("Error logging User out.");
          return;
        }
        return res.data.isLoggedOut;
      })
      .catch((err: any) => {
        // todo
        console.log(err);
      });
  },

  /**
   * Registers a new User.
   *
   * @param {User} user The User object.
   * @returns {Promise<any>} Resulting User added in a Promise.
   */
  register(user: User): Promise<any> {
    return axios
      .post(REGISTER_USER, user)
      .then((res: any) => {
        return res.data;
      })
      .catch((err: any) => {
        // todo
        console.log(err);
      });
  },

  /**
   * Gets a User object from an access token.
   *
   * @param {string} token The access token.
   * @returns {Promise<User>} The resulting User object as a Promise.
   */
  getUserFromToken(token: string): Promise<User> {
    // Set headers.
    const config: any = {
      headers: {
        Authorization: AUTH_TYPE + token
      }
    };

    return axios
      .post(GET_USER_FROM_TOKEN, null, config)
      .then((res: any) => {
        return res.data;
      })
      .catch((err: any) => {
        // todo
        console.log(err);
      });
  }
};

export default AuthService;
