// Constants
import { API_ROUTES } from "../../../.env/api-routes";
import { List } from "./_models/list.model";
// Axios
const axios = require("axios").default;

// API Routes
const GET_ONE_LIST = API_ROUTES.ONE_LIST.GET;
const UPDATE_ONE_LIST = API_ROUTES.ONE_LIST.UPDATE;

export class HomeService {
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
  }

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
}
