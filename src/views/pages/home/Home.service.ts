// Vue
import Vue from "vue";
import VueAxios from "vue-axios";
// Constants
import { API_ROUTES } from "../../../.env/api-routes";
// Models
import { List } from "./_models/list.model";
// Axios
import axios from "axios";

// API Routes
const GET_USER_BY_JWT_TOKEN = API_ROUTES.AUTH.USERS.GET_USER_BY_JWT_TOKEN;

// todo - Get the user's JWT token from the AppState (store)
const jwtToken = "";

const HomeService = {
  init() {
    Vue.use(VueAxios, axios);
  },

  getUser(): Promise<any> {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `JWT ${jwtToken}`
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
  },

  // todo
  updateUserList(index: string, body: List) {}

  // updateOneList(body: List): Promise<any> {
  //   return axios
  //     .put(UPDATE_ONE_LIST, body)
  //     .then(function(res: any) {
  //       return res;
  //     })
  //     .catch(function(err: any) {
  //       console.log(err);
  //     });
  // }

  //   todo
  //   getUserLists(userID: string) {}

  //   updateUserLists(userID: string, body: List) {}

  //   getUserActiveList() {}
};

export default HomeService;
