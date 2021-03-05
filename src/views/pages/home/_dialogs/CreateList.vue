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

              <!-- start:: Submit -->
              <div class="my-10">
                <v-btn class="my-3" color="success" block :disabled="$v.$invalid" @click="onSubmit">
                  create list
                </v-btn>
                <v-btn class="my-3" color="error" block outlined @click="dialog = false">
                  cancel
                </v-btn>
              </div>
              <!-- end:: Submit -->

              <div v-if="previousList">
                <ListCard :list="previousList" />
              </div>
            </form>
          </div>
          <!-- end:: New List form -->
        </v-card>
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
import { List } from "@/views/pages/home/_models/list.model";
// Services
import HomeService from "@/views/pages/home/Home.service";
// Components
import ListCard from "@/components/ListCard.vue";

export default Vue.extend({
  name: "CreateList",
  components: { ListCard },
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
    previousList: null
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
    onSubmit: function(): void {
      // Check form for errors.
      this.$v.$touch();
      if (this.$v.$anyError) return;

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

      const newList: List = {
        category: newListCategory,
        name: this.name,
        items: [],
        isActive: false,
        createdOn: new Date().toISOString()
      };

      const localUserLists = JSON.parse(JSON.stringify(this.userLists));
      localUserLists.unshift(newList);

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

    // todo - maybe refactor List displays into a Component on Home, so we can display the previous List here as well with the same interface.
    checkList: function(categoryIndex: string): void {
      Promise.resolve(HomeService.getUserArchivedListsByCategory(this.userId, categoryIndex)).then(
        (data: any) => {
          if (!data) console.log("Add an error message here!");
          else {
            data[0].isActive = true; // Set the isActive to true so the card is automatically expanded for viewing.
            this.previousList = data[0];
          }
        }
      );
    }
  }
});
</script>
