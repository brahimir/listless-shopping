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

    <!-- start:: User's List -->
    <div v-if="list">
      <v-list v-for="(item, index) in list" :key="index">
        <v-list-item>
          <!-- start:: List Item Checkbox -->
          <v-list-item-action>
            <v-checkbox color="secondary" v-model="item.checked" @click="checkItem(item)"></v-checkbox>
          </v-list-item-action>
          <!-- end:: List Item Checkbox -->

          <!-- start:: List Item Content -->
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
          <!-- end:: List Item Content -->

          <!-- start:: Remove Item -->
          <v-btn icon color="red">
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

export default Vue.extend({
  name: "Home",

  data: () => ({
    input: "what",
    list: [
      {
        name: "Bananas",
        checked: false
      },
      {
        name: "Apples",
        checked: false
      },
      {
        name: "Milk",
        checked: false
      },
      {
        name: "Grapes",
        checked: true
      },
      {
        name: "Potatoes",
        checked: true
      }
    ]
  }),

  // todo - these are where the API calls will take place.
  methods: {
    addItem: function(item: Item) {
      alert(`Adding item ${item.name}`);
    },

    removeItem: function(item: Item) {
      alert(`Removing item ${item.name}`);
    },

    checkItem: function(item: Item) {
      alert(`Checking item ${item.name}`);
    }
  }
});
</script>
