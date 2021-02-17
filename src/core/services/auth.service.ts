// Vue
import Vue from "vue";
import VueAxios from "vue-axios";
// Constants
import { API_ROUTES } from "../../.env/api-routes";
// Models
import { User } from "../_models/user.model";
// Axios
import axios from "axios";

// API Routes
const GET_ONE_LIST = API_ROUTES.ONE_LIST.GET;
const UPDATE_ONE_LIST = API_ROUTES.ONE_LIST.UPDATE;

const AuthService = {
  init() {
    Vue.use(VueAxios, axios);
  }

  // login(): Promise<any> {},

  // register(body: List): Promise<any> {}

  //   todo
  //   getUserLists(userID: string) {}

  //   updateUserLists(userID: string, body: List) {}

  //   getUserActiveList() {}
};

export default AuthService;
