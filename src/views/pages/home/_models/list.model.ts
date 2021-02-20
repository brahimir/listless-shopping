import { Item } from "./item.model";

export interface List {
  category: String;
  name: String;
  items: Item[];
  isActive: boolean;
}
