<style lang="scss" scoped></style>

<template>
  <div id="register">
    <h2 class="text-center mb-10">sign in</h2>

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" xl="4">
            <v-text-field v-model="email" :rules="emailRules" label="e-mail" required></v-text-field>
          </v-col>

          <v-col cols="12" xl="4">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="password"
              required
              type="password"
            ></v-text-field>
          </v-col>

          <v-col class="mt-5" cols="12" xl="4">
            <v-btn tile block elevation="2" large>login</v-btn>
          </v-col>

          <v-col class="text-center mt-5" cols="12" xl="4">
            <v-label><router-link to="/register">don't have an account?</router-link></v-label>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
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

  data: () => ({
    password: "",
    passwordRules: [(v: any) => !!v || "enter your password"],
    email: "",
    emailRules: [
      (v: any) => !!v || "enter your e-mail",
      (v: any) => /.+@.+/.test(v) || "enter a valid e-mail"
    ]
  }),

  methods: {},

  filters: {
    lowercase: FiltersService.lowercase
  }

  // mounted() {}
});
</script>
