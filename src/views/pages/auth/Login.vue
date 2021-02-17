<style lang="scss" scoped></style>

<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
// Models
import { User } from "../../../core/_models/user.model";
// Services
import AuthService from "../../../core/services/auth.service";
import FiltersService from "../../../core/services/filters.service";
// Components
import Spinner from "../../components/content/Spinner.vue";

export default Vue.extend({
  // components: { Spinner },
  name: "Login",

  data: () => ({}),

  methods: {},

  filters: {
    lowercase: FiltersService.lowercase
  }

  // mounted() {}
});
</script>
