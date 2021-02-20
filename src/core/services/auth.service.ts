// Vue
import Vue from "vue";
import VueAxios from "vue-axios";
// Constants
import { API_ROUTES } from "../../.env/api-routes";
// Models
import { User } from "../_models/user.model";
// Axios
import axios from "axios";
import { ResultStorage } from "firebase-functions/lib/providers/testLab";

// todo API Routes
const REGISTER_USER = API_ROUTES.AUTH.USERS.REGISTER;
const LOGIN_USER = API_ROUTES.AUTH.USERS.LOGIN;
const GET_USER = API_ROUTES.AUTH.USERS.GET_USER;

const AuthService = {
  init() {
    Vue.use(VueAxios, axios);
  },

  getLoginToken(credentials: any): Promise<any> {
    return axios
      .post(LOGIN_USER, credentials)
      .then((res: any) => {
        return res.data.token;
      })
      .catch((err: any) => {
        console.log(err);
        return err;
      });
  },

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

  getUser(token: string): Promise<User> {
    // Set headers.
    const config: any = {
      headers: {
        Authorization: "JWT " + token
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
  }

  //   todo
  //   getUserLists(userID: string) {}

  //   updateUserLists(userID: string, body: List) {}

  //   getUserActiveList() {}
};

export default AuthService;
