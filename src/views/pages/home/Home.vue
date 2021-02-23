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

      <v-card v-for="list in lists" :key="list.name" color="grey darken-4">
        <v-card-title>
          {{ list.name }}
        </v-card-title>

        <v-card-subtitle>
          <span class="font-weight-bold">Category: {{ list.category }}</span>
        </v-card-subtitle>

        <v-card-actions>
          <div></div>
          <v-spacer></v-spacer>

          <v-btn icon @click="list.isActive = !list.isActive">
            <v-icon>{{ list.isActive ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="list.isActive">
            <v-divider></v-divider>

            <v-card-text>
              <!-- start:: Add Items to List -->
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-input @keyup.enter.native="addItem(input)">
                      <v-text-field label="add some items..." v-model="input">
                        <v-icon slot="append" @click="addItem(input)" :disabled="!input || isLoading">
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
                      <v-list-item-title
                        :class="{ isChecked: item.checked, 'grey--text': item.checked }"
                      >
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

              <div class="mt-10">
                <v-btn color="warning" block tile outlined>archive list</v-btn>
              </div>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>

      <!-- start:: Add Items to List -->
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-input @keyup.enter.native="addItem(input)">
              <v-text-field label="type here..." v-model="input">
                <v-icon slot="append" @click="addItem(input)" :disabled="!input || isLoading">
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

      <div class="mt-10">
        <v-btn color="warning" block tile outlined>archive list</v-btn>
      </div>
    </div>

    <!-- start:: Loading spinner -->
    <Spinner v-if="isLoading" class="my-5" :size="70" :width="7" :isCentered="true" />
    <!-- end:: Loading spinner -->
  </div>
</template>

<script lang="ts">
// Vue
import Vue from "vue";
// Vuex
import { mapGetters } from "vuex";
// Models
import { Item } from "./_models/item.model";
import { List } from "./_models/list.model";
// Services
import HomeService from "./Home.service";
import FiltersService from "../../../core/services/filters.service";
// Components
import Spinner from "@/components/content/Spinner.vue";

// Default empty list if the list on the server is null.
const defaultList: List = {
  category: "example",
  name: "your list",
  items: [],
  isActive: true
};

const defaultLists: List[] = [
  {
    category: "example",
    name: "your list",
    items: [],
    isActive: true
  }
];

export default Vue.extend({
  components: { Spinner },
  name: "Home",

  data: () => ({
    input: null,
    list: defaultList,
    lists: defaultLists,
    isLoading: false
  }),

  methods: {
    addItem: function(item: string): void {
      // Create the new item.
      const newItem: Item = {
        name: item.toLowerCase(),
        checked: false
      };

      this.list.items.unshift(newItem);
      this.updateActiveList(this.list);

      this.input = null;
    },

    removeItem: function(item: Item): void {
      // Get index of Item to remove
      const index: number = this.list.items.indexOf(item);

      this.list.items.splice(index, 1);
      this.updateActiveList(this.list);
    },

    toggleItem: function(index: number, item: Item): void {
      // todo - shifts item successfully, but "checks" the next item in the list.
      // if (item.checked) {
      //   this.list.items.splice(index, 1);
      //   this.list.items.push(item);
      // } else {
      //   this.list.items.splice(index, 1);
      //   this.list.items.unshift(item);
      // }

      this.updateActiveList(this.list);
    },

    getAllUserLists: function(): void {
      // Resolve the Promise from the HomeService request.
      Promise.resolve(HomeService.getAllUserLists(this.currentUser._id)).then((data: List[]) => {
        this.lists = data;
        console.log(this.lists);
        this.isLoading = false;
      });
    },

    getActiveList: function(): void {
      this.isLoading = true;
      // Resolve the Promise from the HomeService request.
      Promise.resolve(HomeService.getUserActiveList(this.currentUser._id)).then((data: List) => {
        this.list = data;
        this.isLoading = false;
      });
    },

    updateActiveList: function(body: List): void {
      // Promise.resolve(HomeService.updateUserActiveList(body));
    }
  },

  filters: {
    lowercase: FiltersService.lowercase
  },

  mounted() {
    this.getAllUserLists();
    this.getActiveList();
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
});
</script>
