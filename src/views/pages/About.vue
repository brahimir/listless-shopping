<style lang="scss" scoped>
#about {
  margin: auto;
  width: 80%;
}
</style>

<template>
  <div id="about" class="text-center">
    <h2 class="mb-10">about</h2>
    <p>this simple app lets you create and store shopping lists.</p>
    <p>
      future implementations will suggest frequent items, eliminating the need to create lists from
      scratch.
    </p>

    <p class="py-15">
      if you have any suggestions, concerns, or want to report a bug; you can
      <a href="mailto:brahimir.nick@gmail.com">contact me here.</a>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "About",
  components: {}
});
</script>
