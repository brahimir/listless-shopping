<style lang="scss" scoped></style>

<template>
  <div class="mx-3 mb-10">
    <v-row justify="center">
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <!-- start:: Create new List Button -->
          <v-btn color="success" block outlined v-on="on">create new list</v-btn>
          <!-- end:: Create new List Button -->
        </template>
        <v-card>
          <!-- start:: Toolbar -->
          <v-toolbar dark color="green darken-2">
            <v-toolbar-title>
              <h4 class="mt-2">create new list</h4>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <!-- start:: Toolbar -->

          <!-- start:: New List form -->
          <div class="container my-10">
            <form>
              <!-- start:: List name -->
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="20"
                label="list name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <!-- end:: List name -->

              <!-- start:: List category -->
              <v-select
                v-model="category"
                :items="categories"
                :error-messages="categoryErrors"
                label="category"
                item-text="name"
                return-object
                required
                @input="checkList(category.index)"
                @change="$v.category.$touch()"
                @blur="$v.category.$touch()"
              ></v-select>
              <!-- start:: List category -->

              <!-- start:: Check Previous List for unchecked Items -->
              <div v-if="previousList" class="mt-5">
                <h5>
                  we found a previous
                  <span class="mx-1">
                    <v-chip :color="previousList.category.chip.color">
                      <v-icon class="mr-1" small color="white">
                        {{ previousList.category.chip.icon }}
                      </v-icon>
                      <span>{{ previousList.category.name }}</span>
                    </v-chip>
                  </span>
                  list with <span class="font-weight-bold"><u>unchecked</u></span> items:
                </h5>
                <p class="mt-10">
                  <v-icon small color="amber">
                    mdi-star
                  </v-icon>
                  pro tip: you can modify the list below to help create a starting point for your new
                  list!
                </p>

                <!-- start:: Previous List Card -->
                <ListCard
                  :isPreviousList="true"
                  :list="previousList"
                  @add-item="addItem"
                  @remove-item="removeItem"
                />
                <!-- end:: Previous List Card -->

                <v-container class="px-0" fluid>
                  <v-checkbox v-model="usePreviousList">
                    <template v-slot:label>
                      <div>
                        use this list to generate my new
                        <span class="mx-1">
                          <v-chip :color="category.chip.color">
                            <v-icon class="mr-1" small color="white">
                              {{ category.chip.icon }}
                            </v-icon>
                            <span>{{ category.name }}</span>
                          </v-chip>
                        </span>
                        list
                      </div>
                    </template>
                  </v-checkbox>
                </v-container>
              </div>
              <!-- end:: Check Previous List for unchecked Items -->

              <!-- start:: Submit -->
              <div class="my-10">
                <v-btn
                  class="my-3"
                  color="success"
                  block
                  :disabled="$v.$invalid"
                  @click="onSubmit(previousList)"
                >
                  create list
                </v-btn>
                <v-btn class="my-3" color="error" block outlined @click="dialog = false">
                  cancel
                </v-btn>
              </div>
              <!-- end:: Submit -->
            </form>
          </div>
          <!-- end:: New List form -->
        </v-card>

        <!-- start:: Loading spinner -->
        <div v-if="isLoading" class="page-center-spinner-container">
          <Spinner :size="100" :width="7" :isCentered="true" />
        </div>
        <!-- end:: Loading spinner -->
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
// Vue
import Vue from "vue";
// Vuelidate
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
// Constants
import { CATEGORIES } from "@/.env/constants.categories";
// Models
import { Item } from "../_models/item.model";
import { List } from "@/views/pages/home/_models/list.model";
// Services
import HomeService from "@/views/pages/home/Home.service";
// Components
import Spinner from "@/components/content/Spinner.vue";
import ListCard from "@/components/ListCard.vue";

let previousList: List | null;

export default Vue.extend({
  name: "CreateList",
  components: { Spinner, ListCard },
  props: ["userId", "userLists"],
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(20) },
    category: { required }
  },

  data: () => ({
    isLoading: false,
    dialog: false,
    name: "",
    category: null,
    categories: CATEGORIES,
    previousList: previousList,
    usePreviousList: false
  }),

  computed: {
    categoryErrors: function(): string[] {
      const errors: string[] = [];
      if (!this.$v.category.$dirty) return errors;
      !this.$v.category.required && errors.push("enter a list category");
      return errors;
    },

    nameErrors: function(): string[] {
      const errors: string[] = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push("list name must can only be 20 characters long");
      !this.$v.name.required && errors.push("enter a list name");
      return errors;
    }
  },

  methods: {
    onSubmit: function(previousList: List): void {
      // Check form for errors.
      this.$v.$touch();
      if (this.$v.$anyError) return;

      // Get the category of the new List.
      let newListCategory: any;
      if (!this.category) {
        newListCategory = {
          index: null,
          name: null,
          image: null,
          chip: {
            icon: null,
            color: null
          }
        };
      } else {
        newListCategory = this.category;
      }

      // Prepare newList.
      const newList: List = {
        category: newListCategory,
        name: this.name,
        items: [],
        isActive: false,
        createdOn: new Date().toISOString()
      };

      // Check if User is using items from their previousList to populate their newList.
      if (this.usePreviousList) newList.items = previousList.items;

      // Copy props userLists to update and save to server.
      const localUserLists = JSON.parse(JSON.stringify(this.userLists));
      localUserLists.unshift(newList);

      // Save userLists with their newList to server.
      this.isLoading = true;
      Promise.resolve(HomeService.updateUserLists(this.userId, localUserLists)).then(data => {
        // todo - maybe emit an event for success or fail, and display a snackbar message on Home
        // todo - accordingly.
        if (!data) console.log("Add an error message here!");
        else {
          this.$emit("list-added");
        }
        this.isLoading = false;
        this.dialog = false;
      });
    },

    // todo - check lists within a certain time range - we don't want to suggest list items from ~6 months ago.
    checkList: function(categoryIndex: string): void {
      this.previousList = null;

      Promise.resolve(HomeService.getUserArchivedListsByCategory(this.userId, categoryIndex)).then(
        (data: any) => {
          if (!data) console.log("Add an error message here!");
          if (!data.length) console.log("No previous lists of this category exist!");
          else {
            const lastList: List = data[0];
            const uncheckedItems: Item[] = [];

            lastList.items.forEach((element: Item) => {
              if (!element.checked) {
                uncheckedItems.push(element);
              }
            });

            lastList.isActive = true; // Set the isActive to true so the card is automatically expanded for viewing.
            lastList.items = uncheckedItems;

            // If the lastList has no unchecked items, don't return a previousList.
            if (!lastList.items.length) this.previousList = null;
            else this.previousList = lastList;
          }
        }
      );
    },

    // * List functions
    /**
     * Adds User input to the specified list.
     *
     * @param input The User's input
     * @param list  The List to add to.
     */
    addItem: function(input: string | null, list: List): void {
      if (!list) return;
      if (!input) return;
      else {
        const newItem: Item = {
          name: input.toLowerCase(),
          checked: false
        };

        list.items.unshift(newItem);
        input = null;
      }
    },

    /**
     * Removes an Item from the specified list.
     *
     * @param item The Item to remove.
     * @param list  The List to remove from.
     */
    removeItem: function(item: Item, list: List): void {
      if (!list) return;
      else {
        const index: number = list.items.indexOf(item);
        list.items.splice(index, 1);
      }
    },

    // todo - calculate date difference b/w previousList and current date when displaying to User.
    dateDifferencePreviousList: function(): void {
      // todo
    }
  }
});
</script>
