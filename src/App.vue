<template>
  <v-app>
    <!-- AppBar -->
    <AppBar />

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
// Components
import AppBar from "@/components/layout/AppBar.vue";
import Footer from "@/components/layout/Footer.vue";

export default Vue.extend({
  components: { AppBar, Footer },
  name: "App",

  data: () => ({})
});
</script>
