<template>
  <v-app>
    <!-- start:: AppBar -->
    <AppBar />
    <!-- end:: AppBar -->

    <!-- start:: Main Content -->
    <v-main>
      <router-view />
    </v-main>
    <!-- end:: Main Content -->

    <!-- start:: Footer -->
    <Footer />
    <!-- end:: Footer -->
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "@/components/layout/AppBar.vue";
import Footer from "@/components/layout/Footer.vue";

export default Vue.extend({
  components: { AppBar, Footer },
  name: "App",

  data: () => ({})
});
</script>
