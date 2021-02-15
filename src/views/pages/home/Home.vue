<style lang="scss" scoped>
.isChecked {
  text-decoration: line-through;
}
</style>

<template>
  <div class="content">
    <h2 class="text-center mb-10">your list</h2>

    <!-- start:: Add Items to List -->
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-input>
            <v-text-field label="type here..." v-model="input">
              <v-icon slot="append" color="green" @click="addItem(input)" :disabled="!input">
                mdi-plus
              </v-icon>
            </v-text-field>
          </v-input>
        </v-col>
      </v-row>
    </v-container>
    <!-- end:: Add Items to List -->

    <!-- todo - remove this -->
    <div>
      {{ list }}
    </div>

    <!-- start:: User's List -->
    <div v-if="list">
      <v-list v-for="(item, index) in listItems" :key="index" outlined>
        <v-list-item>
          <!-- start:: List Item Checkbox -->
          <v-list-item-action>
            <v-checkbox color="secondary" v-model="item.checked" @click="toggleItem(item)"></v-checkbox>
          </v-list-item-action>
          <!-- end:: List Item Checkbox -->

          <!-- start:: List Item Content -->
          <v-list-item-content>
            <v-list-item-title :class="{ isChecked: item.checked, 'grey--text': item.checked }">
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
          <!-- end:: List Item Content -->

          <!-- start:: Remove Item -->
          <v-btn icon color="red" @click="removeItem(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <!-- end:: Remove Item -->
        </v-list-item>
      </v-list>
    </div>
    <!-- end:: User's List -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// Constants
import { API_ROUTES } from "../../../.env/api-routes";
// Models
import { Item } from "./_models/item.model";
import { List } from "./_models/list.model";
// Services
import { HomeService } from "./Home.service";
const homeService = new HomeService();
// Axios
const axios = require("axios").default;

// GET route for OneList.
const GET_ONE_LIST = API_ROUTES.ONE_LIST.GET;

// Testing list.
const oneList: List = {
  name: "Default",
  items: [
    {
      name: "Bananas",
      checked: false
    },
    {
      name: "Apples",
      checked: false
    },
    {
      name: "Potatoes",
      checked: false
    },
    {
      name: "Milk",
      checked: false
    },
    {
      name: "Oranges",
      checked: false
    },
    {
      name: "Bread",
      checked: false
    }
  ]
};

export default Vue.extend({
  name: "Home",

  data: () => ({
    input: null,
    list: null,
    listName: oneList.name,
    listItems: oneList.items,
    info: ""
  }),

  // todo - these are where the API calls will take place.
  methods: {
    addItem: function(item: string): void {
      // Create the new item.
      const newItem: Item = {
        name: item,
        checked: false
      };

      // Add newItem to local copy of array.
      this.listItems.push(newItem);

      // todo Update User's List on server.

      // Snackbar Messages for success or error.
      console.warn(`Adding item ${newItem.name}`);

      this.input = null;
    },

    removeItem: function(item: Item): void {
      // Get index of Item to remove
      const index: number = this.listItems.indexOf(item);

      // Remove the Item
      this.listItems.splice(index, 1);

      // todo Update User's List on server.

      // Snackbar Messages for success or error.
      console.warn(`Removing item ${item.name}`);
    },

    toggleItem: function(): void {
      this.updateList();
    },

    updateList: function(): void {
      // todo - Update User List with API call here.
      console.warn(`Updated list ${this.listName}:`, this.listItems);
    }
  },

  mounted() {
    // Resolve the Promise from the HomeService request.
    Promise.resolve(homeService.getOneList()).then(data => {
      console.log(data);
      this.list = data;
    });
  }
});
</script>
