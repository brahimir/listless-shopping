<template>
  <nav>
    <v-app-bar app dark>
      <!-- start:: AppBar Title -->
      <div class="v-toolbar-title headline text-lowercase ml-3">
        <router-link class="text-decoration-none" to="/home">
          <span class="ll-white font-weight-light">list</span>
        </router-link>
        <router-link class="text-decoration-none" to="/home">
          <span class="ll-white">less</span>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <!-- end:: AppBar Title -->

      <!-- start:: Settings -->
      <v-btn depressed fab @click="toggleDrawer = !toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <!-- end:: Settings -->

      <!-- start:: AsideDrawer -->
      <v-navigation-drawer v-model="toggleDrawer" app temporary absolute right>
        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" v-bind:to="item.path">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
      </v-navigation-drawer>
      <!-- end:: AsideDrawer -->
    </v-app-bar>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppBar",

  data: () => ({
    toggleDrawer: false,
    items: [
      { title: "Home", icon: "mdi-home", path: "/home" },
      { title: "About", icon: "mdi-forum", path: "/about" },
      { title: "Settings", icon: "mdi-cog", path: "/settings" }
    ]
  })
});
</script>
