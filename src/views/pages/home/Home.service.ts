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
const GET_ALL_USER_LISTS = API_ROUTES.AUTH.USER.LISTS.GET.ALL_LISTS;
const GET_ALL_USER_ARCHIVED_LISTS = API_ROUTES.AUTH.USER.LISTS.GET.ALL_ARCHIVED_LISTS;
const GET_USER_ARCHIVED_LISTS_BY_CATEGORY = API_ROUTES.AUTH.USER.LISTS.GET.ARCHIVED_LISTS_BY_CATEGORY;

const UPDATE_ALL_USER_LISTS = API_ROUTES.AUTH.USER.LISTS.UPDATE.ALL_LISTS;
const UPDATE_ALL_USER_ARCHIVED_LISTS = API_ROUTES.AUTH.USER.LISTS.UPDATE.ALL_ARCHIVED_LISTS;

const HomeService = {
  init() {
    Vue.use(VueAxios, axios);
  },

  /**
   * Gets all User's Lists.
   *
   * @param {string} userId The User's ID.
   * @returns {Promise<any>} Promise with results from the server.
   */
  getAllUserLists(userId: string): Promise<any> {
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

  /**
   * Gets all User's ARCHIVED Lists.
   *
   * @param {string} userId The User's ID.
   * @returns {Promise<any>} Promise with results from the server.
   */
  getAllUserArchivedLists(userId: string): Promise<any> {
    const body = {
      _id: userId
    };

    return axios
      .post(GET_ALL_USER_ARCHIVED_LISTS, body)
      .then(function(res: any) {
        return res.data.archivedLists;
      })
      .catch(function(err: any) {
        // todo
        console.log(err);
      });
  },

  /**
   * Gets the User's ARCHIVED Lists by Category Index.
   *
   * @param {string} userId The User's ID.
   * @param {string} categoryIndex The Category Index.
   * @returns {Promise<any>} Promise with results from the server.
   */
  getUserArchivedListsByCategory(userId: string, categoryIndex: string): Promise<any> {
    const body = {
      _id: userId,
      categoryIndex: categoryIndex
    };

    return axios
      .post(GET_USER_ARCHIVED_LISTS_BY_CATEGORY, body)
      .then(function(res: any) {
        return res.data.archivedListsByCategoryIndex;
      })
      .catch(function(err: any) {
        // todo
        console.log(err);
      });
  },

  /**
   * Updates the User's Lists on the server.
   *
   * @param {string} userId The User's ID.
   * @param {List[]} lists The User's List to update to the server.
   * @returns {Promise<any>} Promise with results from the server.
   */
  updateUserLists(userId: string, lists: List[]): Promise<any> {
    const body: any = {
      _id: userId,
      lists: lists
    };

    return axios
      .put(UPDATE_ALL_USER_LISTS, body)
      .then(function(res: any) {
        return res;
      })
      .catch(function(err: any) {
        // todo
        console.log(err);
      });
  },

  /**
   * Updates the User's ARCHIVED Lists on the server.
   *
   * @param {string} userId The User's ID.
   * @param {List[]} archivedLists The User's ARCHIVED Lists to update to the server.
   * @returns {Promise<any>} Promise with results from the server.
   */
  updateUserArchivedLists(userId: string, archivedLists: List[]): Promise<any> {
    const body: any = {
      _id: userId,
      archivedLists: archivedLists
    };

    return axios
      .put(UPDATE_ALL_USER_ARCHIVED_LISTS, body)
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
