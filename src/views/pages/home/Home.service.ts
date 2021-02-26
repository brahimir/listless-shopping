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
const GET_ALL_USER_LISTS = API_ROUTES.AUTH.USER.LISTS.GET_ALL_LISTS;
const UPDATE_USER_ACTIVE_LIST = API_ROUTES.AUTH.USER.LISTS.UPDATE_ALL_LISTS;

const HomeService = {
  init() {
    Vue.use(VueAxios, axios);
  },

  getAllUserLists(userId: string) {
    const body = {
      _id: userId
    };

    return axios
      .post(GET_ALL_USER_LISTS, body)
      .then(function(res: any) {
        return res.data.lists;
      })
      .catch(function(err: any) {
        // todo
        console.log(err);
      });
  },

  updateUsersLists(userId: string, lists: List[]) {
    const body: any = {
      _id: userId,
      lists: lists
    };

    return axios
      .put(UPDATE_USER_ACTIVE_LIST, body)
      .then(function(res: any) {
        return res;
      })
      .catch(function(err: any) {
        // todo
        console.log(err);
      });
  }
};

export default HomeService;
