<template>
  <v-app-bar app dark>
    <div class="v-toolbar-title headline text-lowercase">
      <span class="font-weight-light">list</span>
      <span>less</span>
    </div>
    <v-spacer></v-spacer>

    <v-btn text>
      <span class="mr-2">Latest Release</span>
      <ApplicationSettings />
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
// Material Icons
import ApplicationSettings from "vue-material-design-icons/ApplicationSettings.vue";

export default Vue.extend({
  name: "AppBar",
  components: { ApplicationSettings }
});
</script>
