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
const GET_ALL_USER_LISTS = API_ROUTES.AUTH.USER.LISTS.GET_ALL_LISTS;
const GET_USER_ACTIVE_LIST = API_ROUTES.AUTH.USER.LISTS.GET_ACTIVE_LIST;
const UPDATE_USER_ACTIVE_LIST = API_ROUTES.AUTH.USER.LISTS.GET_ACTIVE_LIST;

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

  getUserActiveList(userId: string) {
    const body = {
      _id: userId
    };

    return axios
      .post(GET_USER_ACTIVE_LIST, body)
      .then(function(res: any) {
        return res.data.activeList;
      })
      .catch(function(err: any) {
        // todo
        console.log(err);
      });
  },

  updateUserActiveList(userId: string, newList: List) {
    const body: any = {
      listId: userId,
      newList: newList
    };

    return axios
      .put(UPDATE_USER_ACTIVE_LIST, body)
      .then(function(res: any) {
        console.log(res);
        return res;
      })
      .catch(function(err: any) {
        // todo
        console.log(err);
      });
  }
};

export default HomeService;
