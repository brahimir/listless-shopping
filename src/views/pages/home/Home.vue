// todo - Store "checked" items in a separate array, and display them AFTER the "unchecked" items. //
todo - when adding, removing, and checking items - need to individually update them on server instead of
overwriting the array.

<style lang="scss" scoped></style>

<template>
  <div>
    <div id="home" v-if="!isLoading">
      <!-- start:: If currentUser -->
      <div v-if="currentUser">
        <div v-if="lists">
          <h2 class="text-center mb-15">your lists</h2>
          <!-- start:: Refresh -->
          <div class="mt-10 mb-5">
            <v-btn block color="info" @click="getAllLists">refresh lists</v-btn>
          </div>
          <!-- end:: Refresh -->

          <!-- start:: Add a new List -->
          <CreateList :userId="currentUser._id" :userLists="lists" @list-added="getAllLists" />
          <!-- end:: Add a new List -->

          <!-- start:: User Lists -->
          <div v-for="list in lists" :key="list.name">
            <ListCard
              :list="list"
              @add-item="addItem"
              @remove-item="removeItem"
              @toggle-item="toggleItem"
              @update-lists="updateLists"
              @archive-list="archiveList"
              @collapse-lists="collapseLists"
            />
          </div>
          <!-- end:: User Lists -->
        </div>

        <div v-if="!lists.length" class="my-15 font-italic text-muted text-center">
          it's empty in here...
        </div>
      </div>
      <!-- end:: If currentUser -->

      <!-- start:: If NOT currentUser - render sample list -->
      <div v-if="!currentUser">
        <div v-if="lists">
          <h2 class="text-center mb-10">sample list</h2>
          <!-- start:: User Lists -->
          <div v-for="list in lists" :key="list.name">
            <ListCard
              :list="list"
              @add-item="addItem"
              @remove-item="removeItem"
              @toggle-item="toggleItem"
              @update-lists="updateLists"
              @archive-list="archiveList"
              @collapse-lists="collapseLists"
            />
          </div>
          <!-- end:: User Lists -->
        </div>
      </div>
      <!-- end:: If NOT currentUser - render sample list -->
    </div>

    <!-- start:: Loading spinner -->
    <div class="page-center-spinner-container">
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
import FiltersService from "@/core/services/filters.service";
// Moment
import moment from "moment";
// Components
import Spinner from "@/components/content/Spinner.vue";
import ListCard from "@/components/ListCard.vue";
import CreateList from "@/views/pages/home/_dialogs/CreateList.vue";

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

const defaultArchivedLists: List[] = [];

export default Vue.extend({
  components: { Spinner, ListCard, CreateList },
  name: "Home",

  data: () => ({
    input: null,
    lists: defaultLists,
    archivedLists: defaultArchivedLists,
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
     * todo - shifts item successfully, but "checks" the next item in the list.
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
      Promise.resolve(HomeService.updateUserLists(this.currentUser._id, this.lists)).then(() => {
        // todo - set all the User's lists "isActive" to false to collapse them for easier viewing
      });
    },

    /**
     * Archives a User's List on the server.
     * todo - have a confirmation dialog first.
     */
    archiveList: function(list: List): void {
      const index: number = this.lists.indexOf(list);
      const archivedList = this.lists.splice(index, 1)[0];

      // Check if the archived list of items is empty; we don't want to archive an empty list.
      this.isLoading = true;
      if (!archivedList.items.length) {
        this.updateLists();
        this.isLoading = false;
        return;
      }

      this.archivedLists.unshift(archivedList);

      // Add list to archived lists on server.
      Promise.resolve(
        HomeService.updateUserArchivedLists(this.currentUser._id, this.archivedLists)
      ).then(data => {
        if (!data) {
          console.log("Add an error message here!");
        }
        if (data.status === 200) {
          console.log("Add a success message here!");
        } else {
          console.log("Add an error message here!");
        }
        this.updateLists();
        this.isLoading = false;
      });
    },

    /**
     * Retreives the User's lists from the server.
     */
    getAllLists: function(): void {
      this.isLoading = true;

      // If there is no currentUser, fetch the sampleList from localstorage.
      if (!this.currentUser) {
        this.sampleGetLists();
        console.log(this.lists);
        this.isLoading = false;
        return;
      }

      // Get all User's Lists.
      Promise.resolve(HomeService.getAllUserLists(this.currentUser._id)).then((data: List[]) => {
        this.lists = data;

        // Set isActive to false for each List; easier to view all Lists when they're collapsed.
        this.lists.forEach(element => {
          element.isActive = false;
        });
        this.isLoading = false;
      });

      // Get all User's ARCHIVED Lists.
      Promise.resolve(HomeService.getAllUserArchivedLists(this.currentUser._id)).then((data: List[]) => {
        this.archivedLists = data;
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
      this.sampleUpdateLists();
    }
  },

  filters: {
    lowercase: FiltersService.lowercase,
    moment: function(date: string) {
      return moment(date).format("MMMM Do YYYY, h:mm A");
    }
  },

  mounted() {
    this.getAllLists();
  },

  computed: {
    ...mapGetters(["currentUser"])
  }
});
</script>
