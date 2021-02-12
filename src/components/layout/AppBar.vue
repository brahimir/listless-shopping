<template>
  <v-app-bar app dark>
    <div class="v-toolbar-title headline text-lowercase">
      <span class="font-weight-light">list</span>
      <span>less</span>
    </div>
    <v-spacer></v-spacer>

    <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
      <span class="mr-2">Latest Release</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppBar"
});
</script>
