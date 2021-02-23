import { Item } from "./item.model";

export interface List {
  category: {
    index: string;
    name: string;
    image: string;
    chip: {
      icon: string;
      color: string;
    };
  };
  name: String;
  items: Item[];
  isActive: boolean;
  createdOn: string; // ISO string
}
