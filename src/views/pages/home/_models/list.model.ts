import { Item } from "./item.model";

// ? todo - have a category property on lists to differentiate lists for the learning algorithm.
export interface List {
  category: String;
  name: String;
  items: Item[];
}
