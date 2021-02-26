<template>
  <nav>
    <v-app-bar app dark>
      <!-- start:: AppBar Title -->
      <div class="v-toolbar-title headline text-lowercase ml-3">
        <router-link class="text-decoration-none" to="/home">
          <span class="ll-white font-weight-light">list-</span>
        </router-link>
        <router-link class="text-decoration-none" to="/home">
          <span class="ll-white">less</span>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <!-- end:: AppBar Title -->

      <!-- start:: User Metadata -->
      <div v-if="currentUser">
        <v-chip color="green">{{ currentUser.email }}</v-chip>
      </div>

      <!-- end:: User Metadata -->

      <!-- start:: Settings -->
      <v-btn depressed fab @click="toggleDrawer = !toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <!-- end:: Settings -->

      <!-- start:: AsideDrawer -->
      <v-navigation-drawer v-model="toggleDrawer" app temporary absolute right>
        <!-- start:: Display Sign-In if User is not logged in -->
        <v-list v-if="!currentUser" dense>
          <v-list-item v-for="item in signInRegister" :key="item.title" :to="item.path">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!-- start:: Display Sign-In if User is not logged in -->

        <!-- start:: Display Logout if User is logged in -->
        <div v-if="currentUser">
          <v-list-item v-for="item in signOut" :key="item.title" @click="logout">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <!-- end:: Display Logout if User is logged in -->

        <!-- start:: General -->
        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in general" :key="item.title" v-bind:to="item.path">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!-- end:: General -->

        <!-- start:: User Account -->
        <div v-if="user">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>account</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>

          <v-list dense>
            <v-list-item v-for="item in userAccount" :key="item.title" :to="item.path">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <!-- end:: User Account -->
      </v-navigation-drawer>
      <!-- end:: AsideDrawer -->
    </v-app-bar>
  </nav>
</template>

<script lang="ts">
// Vue
import Vue from "vue";
// Vuex
import { mapGetters } from "vuex";
// Services
import AuthService from "@/core/services/auth.service";

// todo - get the user from AppState store.
// const user = {
//   username: "fam",
//   lists: []
// };
const user = null;

export default Vue.extend({
  name: "AppBar",

  data: () => ({
    user: user,
    toggleDrawer: false,
    asideMenu: [], // todo - have all the below arrays contained in this array, and just render out the menu from there
    signInRegister: [
      { title: "sign in", icon: "mdi-login", path: "/login" },
      { title: "register", icon: "mdi-account-plus", path: "/register" }
    ],
    signOut: [{ title: "sign out", icon: "mdi-logout", path: "/login" }],
    general: [
      { title: "home", icon: "mdi-home", path: "/home" },
      { title: "about", icon: "mdi-forum", path: "/about" },
      { title: "settings", icon: "mdi-cog", path: "/settings" }
    ],
    userAccount: [{ title: "lists", icon: "mdi-format-list-checks", path: "/lists" }]
  }),
  methods: {
    logout: function(): void {
      Promise.resolve(AuthService.logout(this.currentUser._id)).then((isLoggedOut: boolean) => {
        if (!isLoggedOut) {
          console.log("Error logging User out.");
        } else {
          this.$store.dispatch("LOGOUT");
          this.$router.push("/login");
        }
      });
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
});
</script>
