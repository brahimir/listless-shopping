<style lang="scss" scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<template>
  <div :class="{ centered: isCentered }">
    <v-progress-circular :size="size" :width="width" color="color" indeterminate></v-progress-circular>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Spinner",
  props: ["size", "width", "color", "isCentered"]
});
</script>
