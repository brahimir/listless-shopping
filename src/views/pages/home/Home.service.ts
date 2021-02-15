// Constants
import { API_ROUTES } from "../../../.env/api-routes";
import { List } from "./_models/list.model";
// Axios
const axios = require("axios").default;

const GET_ONE_LIST = API_ROUTES.ONE_LIST.GET;

export class HomeService {
  getOneList(): Promise<List> {
    return (
      axios
        .get(GET_ONE_LIST)

        // Success
        .then((res: any) => {
          return res.data;
        })

        // Error
        .catch((err: any) => {
          console.warn(err);
        })
    );
  }

  //   todo
  //   getUserLists() {}

  //   getUserActiveList() {}
}
