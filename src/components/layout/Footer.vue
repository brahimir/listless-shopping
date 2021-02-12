<template>
  <v-footer v-bind="{ variant }" :padless="true">
    <v-card flat tile width="100%" class="light lighten-1 text-center">
      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — list<strong>less</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Footer",

  data: () => ({
    icons: ["mdi-arrow-up"],
    // Footer position
    variant: "fixed" // absolute, default
  })
});
</script>
