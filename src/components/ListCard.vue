<style lang="scss" scoped>
.isChecked {
  text-decoration: line-through;
}

.checked {
  background-color: #161616;
  border: 1px solid #161616;
}

.v-sheet {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
</style>

<template>
  <div>
    <v-card class="my-7" color="grey darken-4" tile>
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
                    <v-list-item-title :class="{ isChecked: item.checked, 'grey--text': item.checked }">
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

            <!-- start:: Archive List (with confirmation) -->
            <div class="mt-15 mb-6 mx-4">
              <ConfirmationDialog
                :width="500"
                :dialogButtonText="'archive list'"
                :dialogButtonColor="'red'"
                :dialogButtonIsBlock="true"
                :dialogButtonIsTile="false"
                :headerTitle="'confirmation'"
                :confirmationMessage="'are you sure you want to archive this list?'"
                :acceptText="'yes'"
                :declineText="'no'"
                @is-confirmed="archiveList(list)"
              />
            </div>
            <!-- end:: Archive List (with confirmation) -->
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
// Vue
import Vue from "vue";
// Models
import { List } from "@/views/pages/home/_models/list.model";
import { Item } from "@/views/pages/home/_models/item.model";
// Services
import FiltersService from "@/core/services/filters.service";
// Moment
import moment from "moment";
// Components
import ConfirmationDialog from "@/components/content/_dialogs/ConfirmationDialog.vue";

export default Vue.extend({
  name: "ListCard",
  components: { ConfirmationDialog },
  props: ["list"],

  data: () => ({
    isLoading: false,
    propsLists: [],
    input: null
  }),

  methods: {
    /**
     * Emit a add-item event to Home; Adds User input to the specified list.
     *
     * @param input The User's input
     * @param list  The List to add to.
     */
    addItem: function(input: string | null, list: List): void {
      this.$emit("add-item", input, list);
      this.input = null;
    },

    /**
     * Emit a remove-item event to Home; Removes an Item from the specified list.
     *
     * @param item The Item to remove.
     * @param list  The List to remove from.
     */
    removeItem: function(item: Item, list: List): void {
      this.$emit("remove-item", item, list);
    },

    /**
     * todo - shifts item successfully, but "checks" the next item in the list.
     * Emit a toggle-item event to Home; Toggles an item as checked or unchecked (functionality will shift the item to the bottom of the
     * list).
     *
     * @param item The Item to toggle.
     * @param list  The List the Item belongs to.
     */
    toggleItem: function(item: Item, list: List): void {
      this.$emit("toggle-item", item, list);
    },

    /**
     * Emit a update-lists event to Home; Updates the User's lists to the server.
     */
    updateLists: function(): void {
      this.$emit("update-lists");
    },

    /**
     * Emit a archive-list event to Home; Archives a User's List on the server.
     * todo - have a confirmation dialog first.
     */
    archiveList: function(list: List): void {
      this.$emit("archive-list", list);
    },

    /**
     * Emit a collapse-lists event to Home; Collapses other lists while a new list is opened.
     *
     * @param list The list that was selected and opened.
     */
    collapseLists: function(list: List): void {
      this.$emit("collapse-lists", list);
    }
  },

  filters: {
    lowercase: FiltersService.lowercase,
    moment: function(date: string) {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    }
  }
});
</script>
