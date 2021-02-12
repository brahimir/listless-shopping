<template>
  <v-app-bar app dark>
    <div class="v-toolbar-title headline text-lowercase">
      <router-link class="text-decoration-none" to="/home">
        <span class="ll-white font-weight-light">list</span>
      </router-link>
      <router-link class="text-decoration-none" to="/home">
        <span class="ll-white">less</span>
      </router-link>
    </div>
    <v-spacer></v-spacer>

    <v-btn depressed fab>
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppBar"
});
</script>
