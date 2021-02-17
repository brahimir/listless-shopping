<style lang="scss" scoped>
#settings {
  margin: auto;
  width: 80%;
}
</style>

<template>
  <div id="settings" class="text-center">
    <h2 class="mb-10">settings</h2>

    <!-- start:: Dark Mode Switch -->
    <v-switch v-model="isDarkMode" label="Dark Mode"></v-switch>
    <!-- end:: Dark Mode Switch -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "About",

  data: () => ({
    isDarkMode: true
  }),

  methods: {
    // todo
    toggleDarkMode: () => {
      return;
    }
  }
});
</script>
