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

const REGISTER_USER = API_ROUTES.AUTH.USERS.REGISTER;
const LOGIN_USER = API_ROUTES.AUTH.USERS.LOGIN;
const GET_USER = API_ROUTES.AUTH.USERS.GET_USER;

const AuthService = {
  init() {
    Vue.use(VueAxios, axios);
  },

  login(credentials: any): Promise<any> {
    return axios
      .post(LOGIN_USER, credentials)
      .then((res: any) => {
        return this.getUserFromToken(res.data.token).then((user: User) => {
          user.authToken = res.data.token;
          return user;
        });
      })
      .catch((err: any) => {
        console.log(err);
        return err;
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
        console.log(err);
        return err;
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
      .post(GET_USER, null, config)
      .then((res: any) => {
        return res.data;
      })
      .catch((err: any) => {
        console.log(err);
        return err;
      });
  },

  // todo
  logout(): void {
    // todo Remove the token from local storage.
  }
};

export default AuthService;
