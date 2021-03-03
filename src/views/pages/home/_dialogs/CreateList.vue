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
          <v-toolbar dark color="green darken-4">
            <v-toolbar-title>new list</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <!-- start:: Toolbar -->

          <!-- start:: New List form -->
          <div class="mx-10 my-10">
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
              <div class="my-5">
                <v-btn class="my-3" color="success" block @click="onSubmit">
                  create
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

export default Vue.extend({
  mixins: [validationMixin],
  props: ["userId", "userLists"],
  name: "CreateList",
  validations: {
    name: { required, maxLength: maxLength(20) },
    category: { required }
  },

  data: () => ({
    isLoading: false,
    dialog: false,
    name: "",
    category: CATEGORIES[0],
    categories: CATEGORIES,
    previousList: []
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

      const newList: List = {
        category: this.category,
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
        if (!data) {
          console.log("Add an error message here!");
        }
        if (data.status === 200) {
          console.log("Add a success message here!");
        } else {
          console.log("Add an error message here!");
        }
        this.$emit("list-added");
        this.isLoading = false;
        this.dialog = false;
      });
    },

    // todo - check lists within a certain time range - we don't want to suggest list items from ~6 months ago.
    checkList: function(categoryIndex: string): void {
      Promise.resolve(HomeService.getUserArchivedListsByCategory(this.userId, categoryIndex)).then(
        (data: any) => {
          if (!data) console.log("Add an error message here!");
          else {
            console.log(data);
          }
        }
      );
    }
  }
});
</script>
