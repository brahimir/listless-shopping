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
      {{ info }}
    </div>

    <!-- start:: User's List -->
    <div v-if="list">
      <v-list v-for="(item, index) in list" :key="index" outlined>
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
import { Item } from "./_models/item.model";

const axios = require("axios").default;

const list: Item[] = [];

export default Vue.extend({
  name: "Home",

  data: () => ({
    input: null,
    list: list,
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
      this.list.push(newItem);

      // todo Update User's List on server.

      // Snackbar Messages for success or error.
      console.warn(`Adding item ${newItem.name}`);

      this.input = null;
    },

    removeItem: function(item: Item): void {
      // Get index of Item to remove
      const index: number = this.list.indexOf(item);

      // Remove the Item
      this.list.splice(index, 1);

      // todo Update User's List on server.

      // Snackbar Messages for success or error.
      console.warn(`Removing item ${item.name}`);
    },

    toggleItem: function(): void {
      this.updateList();
    },

    updateList: function(): void {
      // todo - Update User List with API call here.
      console.warn("Updated list:", this.list);
    }
  },

  // todo - example
  mounted() {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response: any) => (this.info = response));
  }
});
</script>
