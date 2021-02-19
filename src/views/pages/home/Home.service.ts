// Vue
import Vue from "vue";
import VueAxios from "vue-axios";
// Constants
import { API_ROUTES } from "../../../.env/api-routes";
// Models
import { List } from "./_models/list.model";
// Axios
import axios from "axios";

// OneList Routes
const GET_ONE_LIST = API_ROUTES.ONE_LIST.GET_ONE_LIST;
const UPDATE_ONE_LIST = API_ROUTES.ONE_LIST.UPDATE_ONE_LIST;

// API Routes
const GET_USER_BY_JWT_TOKEN = API_ROUTES.AUTH.USERS.GET_USER;

const HomeService = {
  init() {
    Vue.use(VueAxios, axios);
  },

  getOneList(): Promise<any> {
    return axios
      .get(GET_ONE_LIST)
      .then(function(res: any) {
        return res.data;
      })
      .catch(function(err: any) {
        console.log(err);
      });
  },

  updateOneList(body: List): Promise<any> {
    return axios
      .put(UPDATE_ONE_LIST, body)
      .then(function(res: any) {
        return res;
      })
      .catch(function(err: any) {
        console.log(err);
      });
  },

  /**
   * Gets the current logged in user via JWT token.
   *
   * @returns {Promise<any>} The User as a Promise.
   */
  getUser(token: string): Promise<any> {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": token.length,
      Authorization: `JWT ${token}`
    };

    return axios
      .post(GET_USER_BY_JWT_TOKEN, headers)
      .then(function(res: any) {
        console.log(res);
        return res.data[0];
      })
      .catch(function(err: any) {
        // handle error
        console.log(err);
      });
  }

  // todo
  // updateList(index: string, body: List) {}

  //   todo
  //   getUserLists(userID: string) {}

  //   updateUserLists(userID: string, body: List) {}

  //   getUserActiveList() {}
};

export default HomeService;
