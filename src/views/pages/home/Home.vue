// eslint-disable-next-line prettier/prettier // eslint-disable-next-line prettier/prettier // todo -
Store "checked" items in a separate array, and display them AFTER the "unchecked" items. // todo - when
adding, removing, and checking items - need to individually update them on server instead of overwriting
the array.

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

.spinner-container {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>

<template>
  <div>
    <div id="home" v-if="!isLoading">
      <!-- start:: If currentUser -->
      <div v-if="currentUser">
        <div v-if="lists">
          <h2 class="text-center mb-15">your lists</h2>
          <div class="my-10">
            <v-btn block color="info" @click="getAllUserLists">refresh lists</v-btn>
          </div>

          <!-- start:: Add a new List -->
          <CreateList :userId="currentUser._id" :userLists="lists" />
          <!-- end:: Add a new List -->

          <!-- start:: User Lists -->
          <div>
            <v-card v-for="list in lists" :key="list.name" class="my-7" color="grey darken-4" tile>
              <v-img
                height="150"
                :src="require(`@/assets/media/category-images/${list.category.image}`)"
              ></v-img>
              <v-card-title>
                {{ list.name }}
              </v-card-title>

              <v-card-subtitle>created on {{ list.createdOn | moment }}</v-card-subtitle>

              <v-card-actions>
                <v-chip :color="list.category.chip.color">
                  <v-icon class="mr-1" small color="white">
                    {{ list.category.chip.icon }}
                  </v-icon>
                  <span class="font-weight-bold">{{ list.category.name }}</span>
                </v-chip>
                <v-spacer></v-spacer>

                <v-btn icon @click="collapseLists(list)">
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
                          <v-input @keyup.enter.native="addItem(input, list)">
                            <v-text-field label="add some items..." v-model="input">
                              <v-icon
                                color="green"
                                slot="append"
                                @click="addItem(input, list)"
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
                              @click="toggleItem(item, list)"
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
                          <v-btn v-if="!item.checked" icon color="red" @click="removeItem(item, list)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                          <v-btn v-else icon color="grey" @click="removeItem(item, list)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                          <!-- end:: Remove Item -->
                        </v-list-item>
                      </v-list>
                    </div>
                    <!-- end:: Items List -->

                    <div class="mt-10 mb-6 mx-3">
                      <v-btn @click="archiveList(list)" color="error" block tile>archive list</v-btn>
                      <!-- <v-row justify="center">
                        <v-dialog v-model="dialog">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn color="warning" block tile dark v-bind="attrs" v-on="on">
                              archive list
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title class="headline">archive confirmation</v-card-title>
                            <v-card-text>are you sure you want to archive this list?</v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="green darken-1" tile @click="archiveList(list)">
                                yes
                              </v-btn>
                              <v-btn color="red darken-1" tile outlined @click="dialog = false">
                                no
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-row> -->
                    </div>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </div>
          <!-- end:: User Lists -->
        </div>

        <div v-if="!lists.length" class="font-italic text-muted text-center">
          it's empty in here...
        </div>
      </div>
      <!-- end:: If currentUser -->

      <!-- start:: If NOT currentUser - render sample list -->
      <div v-if="!currentUser">
        <div v-if="lists">
          <h2 class="text-center mb-10">sample list</h2>
          <!-- start:: User Lists -->
          <div>
            <v-card v-for="list in lists" :key="list.name" class="my-7" color="grey darken-4" tile>
              <v-img
                height="150"
                :src="require(`@/assets/media/category-images/${list.category.image}`)"
              ></v-img>
              <v-card-title>
                {{ list.name }}
              </v-card-title>

              <v-card-subtitle>created on: {{ list.createdOn | moment }}</v-card-subtitle>

              <v-card-actions>
                <v-chip :color="list.category.chip.color">
                  <v-icon class="mr-1" small color="white">
                    {{ list.category.chip.icon }}
                  </v-icon>
                  <span class="font-weight-bold">{{ list.category.name }}</span>
                </v-chip>
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
                          <v-input @keyup.enter.native="sampleAddItem(input, list)">
                            <v-text-field label="add some items..." v-model="input">
                              <v-icon
                                color="green"
                                slot="append"
                                @click="sampleAddItem(input, list)"
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
                              @click="sampleToggleItem(item, list)"
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
                          <v-btn
                            v-if="!item.checked"
                            icon
                            color="red"
                            @click="sampleRemoveItem(item, list)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                          <v-btn v-else icon color="grey" @click="sampleRemoveItem(item, list)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                          <!-- end:: Remove Item -->
                        </v-list-item>
                      </v-list>
                    </div>
                    <!-- end:: Items List -->

                    <div class="mt-10">
                      <v-btn @click="sampleClearList" color="error" block tile>clear list</v-btn>
                    </div>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </div>
          <!-- end:: User Lists -->
        </div>
      </div>
      <!-- end:: If NOT currentUser - render sample list -->
    </div>

    <!-- start:: Loading spinner -->
    <div class="spinner-container">
      <Spinner v-if="isLoading" :size="100" :width="7" :isCentered="true" />
    </div>
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
// Moment
import moment from "moment";
// Components
import Spinner from "@/components/content/Spinner.vue";
import CreateList from "@/views/pages/home/_dialogs/CreateList.vue";
import ConfirmationDialog from "@/components/content/_dialogs/ConfirmationDialog.vue";

// Default list for non currentUser.
const defaultLists: List[] | null = [
  {
    category: {
      index: "sample",
      name: "sample",
      image: "sample.jpg",
      chip: {
        icon: "mdi-pencil",
        color: "yellow darken-3"
      }
    },
    items: [
      {
        name: "pencils",
        checked: false
      },
      {
        name: "erasers",
        checked: false
      },
      {
        name: "more items...",
        checked: false
      }
    ],
    name: "sample list",
    isActive: true,
    createdOn: new Date().toISOString()
  }
];

export default Vue.extend({
  components: { Spinner, CreateList },
  name: "Home",

  data: () => ({
    input: null,
    lists: defaultLists,
    isLoading: false,
    dialog: false
  }),

  methods: {
    // * User List functions
    /**
     * Adds User input to the specified list.
     *
     * @param input The User's input
     * @param list  The List to add to.
     */
    addItem: function(input: string | null, list: List): void {
      if (!input) return;

      // Create the new item.
      const newItem: Item = {
        name: input.toLowerCase(),
        checked: false
      };

      list.items.unshift(newItem);
      this.lists.splice(this.lists.indexOf(list), 1, list);
      this.updateLists();

      this.input = null;
    },

    /**
     * Removes an Item from the specified list.
     *
     * @param item The Item to remove.
     * @param list  The List to remove from.
     */
    removeItem: function(item: Item, list: List): void {
      // Get index of Item to remove
      const index: number = list.items.indexOf(item);

      list.items.splice(index, 1);
      this.lists.splice(this.lists.indexOf(list), 1, list);
      this.updateLists();
    },

    /**
     * todo
     * Toggles an item as checked or unchecked (functionality will shift the item to the bottom of the
     * list).
     *
     * @param item The Item to toggle.
     * @param list  The List the Item belongs to.
     */
    toggleItem: function(item: Item, list: List): void {
      // todo - shifts item successfully, but "checks" the next item in the list.
      const index: number = list.items.indexOf(item);

      // if (item.checked) {
      //   list.items.splice(index, 1);
      //   list.items.push(item);
      // } else {
      //   list.items.splice(index, 1);
      //   list.items.unshift(item);
      // }
      // this.lists.splice(this.lists.indexOf(list), 1, list);
      this.updateLists();
    },

    /**
     * Updates the User's lists to the server.
     */
    updateLists: function(): void {
      // Resolve the Promise from the HomeService request.
      Promise.resolve(HomeService.updateUsersLists(this.currentUser._id, this.lists)).then();
    },

    /**
     * Archives a User's List on the server.
     * todo - have a confirmation dialog first.
     */
    archiveList: function(list: List): void {
      const index: number = this.lists.indexOf(list);
      this.lists.splice(index, 1);

      // todo - add the removed list to the User's archived_lists on server.
      // const archivedList = this.lists.splice(index, 1);

      this.isLoading = true;
      Promise.resolve(HomeService.updateUsersLists(this.currentUser._id, this.lists)).then(data => {
        if (!data) {
          console.log("Add an error message here!");
        }
        if (data.status === 200) {
          console.log("Add a success message here!");
        } else {
          console.log("Add an error message here!");
        }
        this.isLoading = false;
      });
    },

    /**
     * Retreives the User's list from the server.
     */
    getAllUserLists: function(): void {
      this.isLoading = true;

      // If there is no currentUser, fetch the sampleList from localstorage.
      if (!this.currentUser) {
        this.sampleGetLists();
        this.isLoading = false;
        return;
      }
      // Resolve the Promise from the HomeService request.
      Promise.resolve(HomeService.getAllUserLists(this.currentUser._id)).then((data: List[]) => {
        this.lists = data;
        this.isLoading = false;
      });
    },

    // todo - get generated list from learning algorithm from server here.
    generateList: function(): void {
      // todo
    },

    /**
     * Collapses other lists while a new list is opened.
     *
     * @param list The list that was selected and opened.
     */
    collapseLists: function(list: List): void {
      list.isActive = !list.isActive;

      this.lists.forEach(element => {
        if (this.lists.indexOf(element) != this.lists.indexOf(list)) {
          element.isActive = false;
        }
      });

      this.updateLists();
    },

    // * Sample List functions

    sampleAddItem: function(input: string, list: List): void {
      const newItem: Item = {
        name: input,
        checked: false
      };

      list.items.unshift(newItem);
      this.lists.splice(this.lists.indexOf(list), 1, list);
      this.sampleUpdateLists();

      this.input = null;
      // todo
    },

    sampleRemoveItem: function(item: Item, list: List): void {
      // Get index of Item to remove
      const index: number = list.items.indexOf(item);

      list.items.splice(index, 1);
      this.lists.splice(this.lists.indexOf(list), 1, list);
      this.sampleUpdateLists();
    },

    sampleToggleItem: function(): void {
      // todo
      this.sampleUpdateLists();
    },

    sampleUpdateLists: function(): void {
      window.localStorage.setItem("sampleLists", JSON.stringify(this.lists));
    },

    sampleGetLists: function(): void {
      const sampleLists: string | null = window.localStorage.getItem("sampleLists");

      if (!sampleLists) this.lists = defaultLists;
      else this.lists = JSON.parse(sampleLists);
    },

    /**
     * Clears the sample list.
     */
    sampleClearList: function(): void {
      this.lists = [
        {
          category: {
            index: "sample",
            name: "sample",
            image: "sample.jpg",
            chip: {
              icon: "mdi-pencil",
              color: "yellow darken-3"
            }
          },
          items: [],
          name: "sample list",
          isActive: true,
          createdOn: new Date().toISOString()
        }
      ];
    }
  },

  filters: {
    lowercase: FiltersService.lowercase,
    moment: function(date: string) {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    }
  },

  mounted() {
    this.getAllUserLists();
  },

  computed: {
    ...mapGetters(["currentUser"])
  }
});
</script>
