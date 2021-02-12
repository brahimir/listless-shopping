<template>
  <div>
    <!-- <v-navigation-drawer v-model="toggleDrawer" app temporary absolute right>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
    </v-navigation-drawer> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppBar",
  props: ["toggleDrawer"],
  watch: {
    toggleDrawer(value) {
      return value;
    }
  }
});
</script>
