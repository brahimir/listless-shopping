<style lang="scss">
@import "assets/sass/style.vue";
</style>

<template>
  <v-app>
    <!-- start:: AppBar -->
    <AppBar />
    <!-- end:: AppBar -->

    <!-- start:: Content -->
    <v-main>
      <div class="container my-10">
        <router-view />
      </div>
    </v-main>
    <!-- end:: Content -->

    <!-- start:: Footer -->
    <Footer />
    <!-- end:: Footer -->
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
// RxJS
// ? todo
// Components
import AppBar from "@/components/layout/AppBar.vue";
import Footer from "@/components/layout/Footer.vue";

export default Vue.extend({
  components: { AppBar, Footer },
  name: "App"
});
</script>
