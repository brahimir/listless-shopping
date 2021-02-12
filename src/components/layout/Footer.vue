<template>
  <v-footer v-bind="{ variant }" :padless="true">
    <v-card flat tile width="100%" class="light lighten-1 text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — listComponentAdded an AppBar Component. Adding a Footer
        Component.<strong>less</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Footer",

  data: () => ({
    icons: ["mdi-home"],
    variant: "fixed" // absolute, default
  })
});
</script>
