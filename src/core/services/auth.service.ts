// Vue
import Vue from "vue";
import VueAxios from "vue-axios";
// Constants
import { API_ROUTES } from "../../.env/api-routes";
// Models
import { User } from "../_models/user.model";
// Axios
import axios from "axios";

// todo API Routes
const REGISTER_USER = API_ROUTES.AUTH.USERS.REGISTER;
const LOGIN_USER = API_ROUTES.AUTH.USERS.LOGIN;

const AuthService = {
  init() {
    Vue.use(VueAxios, axios);
  },

  login(credentials: any): Promise<any> {
    return axios
      .post(LOGIN_USER, credentials)
      .then(function(res: any) {
        return res.data;
      })
      .catch(function(err: any) {
        console.log(err);
      });
  },

  register(user: User): Promise<any> {
    return axios
      .post(REGISTER_USER, user)
      .then(function(res: any) {
        return res.data;
      })
      .catch(function(err: any) {
        console.log(err);
      });
  }

  //   todo
  //   getUserLists(userID: string) {}

  //   updateUserLists(userID: string, body: List) {}

  //   getUserActiveList() {}
};

export default AuthService;
