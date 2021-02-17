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
const GET_ONE_LIST = API_ROUTES.ONE_LIST.GET;
const UPDATE_ONE_LIST = API_ROUTES.ONE_LIST.UPDATE;

const HomeService = {
  init() {
    Vue.use(VueAxios, axios);
  },

  getOneList(): Promise<any> {
    return axios
      .get(GET_ONE_LIST)
      .then(function(res: any) {
        return res.data[0];
      })
      .catch(function(err: any) {
        // handle error
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
  }

  //   todo
  //   getUserLists(userID: string) {}

  //   updateUserLists(userID: string, body: List) {}

  //   getUserActiveList() {}
};

export default HomeService;
