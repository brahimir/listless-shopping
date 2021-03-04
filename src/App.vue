<style lang="scss">
@import "assets/sass/style.vue";
</style>

<template>
  <v-app>
    <!-- start:: AppBar -->
    <AppBar :currentUser="currentUser" />
    <!-- end:: AppBar -->

    <!-- start:: Content -->
    <v-main>
      <div class="container my-15">
        <router-view :currentUser="currentUser" />
      </div>
    </v-main>
    <!-- end:: Content -->

    <!-- start:: Footer -->
    <Footer />
    <!-- end:: Footer -->
  </v-app>
</template>

<script lang="ts">
// Vue
import Vue from "vue";
// Vuex
import { mapGetters } from "vuex";
// Components
import AppBar from "@/components/layout/AppBar.vue";
import Footer from "@/components/layout/Footer.vue";

export default Vue.extend({
  components: { AppBar, Footer },
  name: "App",
  computed: {
    ...mapGetters(["currentUser"])
  }
});
</script>
