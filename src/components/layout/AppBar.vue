<template>
  <v-app-bar app dark>
    <div class="v-toolbar-title headline text-lowercase">
      <span class="font-weight-light">list</span>
      <span>less</span>
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
