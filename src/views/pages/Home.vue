<style lang="scss" scoped>
#list {
  margin: auto;
  width: 80%;
}
</style>

<template>
  <div id="list" class="text-center">
    <h2 class="mb-10">your list</h2>
    <v-text-field label="Add items..."></v-text-field>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home"
});
</script>
