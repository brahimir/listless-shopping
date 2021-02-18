// todo - Store "checked" items in a separate array, and display them AFTER the "unchecked" items.

<style lang="scss" scoped>
.isChecked {
  text-decoration: line-through;
}

.v-sheet {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.checked {
  background-color: #161616;
  border: 1px solid #161616;
}
</style>

<template>
  <div>
    <div v-if="!isLoading" class="content">
      <h2 class="text-center mb-10">{{ list.name | lowercase }}</h2>

      <!-- start:: Add Items to List -->
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-input @keyup.enter.native="addItem(input)">
              <v-text-field label="type here..." v-model="input">
                <v-icon
                  slot="append"
                  color="green"
                  @click="addItem(input)"
                  :disabled="!input || isLoading"
                >
                  mdi-plus
                </v-icon>
              </v-text-field>
            </v-input>
          </v-col>
        </v-row>
      </v-container>
      <!-- end:: Add Items to List -->

      <!-- start:: Items List -->
      <div>
        <v-list
          v-for="(item, index) in list.items"
          :key="index"
          :class="{ checked: item.checked }"
          outlined
        >
          <v-list-item>
            <!-- start:: List Item Checkbox -->
            <v-list-item-action>
              <v-checkbox
                color="secondary"
                v-model="item.checked"
                @click="toggleItem(index, item)"
              ></v-checkbox>
            </v-list-item-action>
            <!-- end:: List Item Checkbox -->

            <!-- start:: List Item Content -->
            <v-list-item-content>
              <v-list-item-title :class="{ isChecked: item.checked, 'grey--text': item.checked }">
                {{ item.name | lowercase }}
              </v-list-item-title>
            </v-list-item-content>
            <!-- end:: List Item Content -->

            <!-- start:: Remove Item -->
            <v-btn v-if="!item.checked" icon color="red" @click="removeItem(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn v-else icon color="grey" @click="removeItem(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <!-- end:: Remove Item -->
          </v-list-item>
        </v-list>
      </div>
      <!-- end:: Items List -->
    </div>

    <!-- start:: Loading spinner -->
    <Spinner v-if="isLoading" class="my-5" :size="70" :width="7" :isCentered="true" />
    <!-- end:: Loading spinner -->
  </div>
</template>

<script lang="ts">
// Vue
import Vue from "vue";
// Models
import { Item } from "./_models/item.model";
import { List } from "./_models/list.model";
// Services
import HomeService from "./home.service";
import FiltersService from "../../../core/services/filters.service";
// Components
import Spinner from "@/components/content/Spinner.vue";

// Default empty list if the list on the server is null.
const emptyList: List = {
  name: "your list",
  items: []
};

export default Vue.extend({
  components: { Spinner },
  name: "Home",

  data: () => ({
    input: null,
    list: emptyList,
    isLoading: false
  }),

  methods: {
    addItem: function(item: string): void {
      // Create the new item.
      const newItem: Item = {
        name: item.toLowerCase(),
        checked: false
      };

      // Add newItem to local copy of array.
      this.list.items.push(newItem);

      // Update List on server.
      this.updateList(this.list);

      this.input = null;
    },

    removeItem: function(item: Item): void {
      // Get index of Item to remove
      const index: number = this.list.items.indexOf(item);

      // Remove the Item
      this.list.items.splice(index, 1);

      // Update List on server.
      this.updateList(this.list);
    },

    toggleItem: function(index: number, item: Item): void {
      // if (item.checked) {
      //   this.list.items.splice(index, 1);
      //   this.list.items.push(item);
      // } else {
      //   this.list.items.splice(index, 1);
      //   this.list.items.unshift(item);
      // }

      this.updateList(this.list);
    },

    getList: function(): void {
      this.isLoading = true;
      // Resolve the Promise from the HomeService request.
      Promise.resolve(HomeService.getOneList()).then(data => {
        this.list = data;
        this.isLoading = false;
      });
    },

    updateList: function(body: List): void {
      Promise.resolve(HomeService.updateOneList(body));
    }
  },

  filters: {
    lowercase: FiltersService.lowercase
  },

  mounted() {
    this.getList();
  }
});
</script>
