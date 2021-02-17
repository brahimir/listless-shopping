<style lang="scss" scoped>
#register {
  margin: auto;
  width: 80%;
}
</style>

<template>
  <div id="register">
    <h2 class="text-center mb-10">register</h2>

    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="email" :rules="emailRules" label="e-mail" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="password"
              required
              type="password"
            ></v-text-field>
          </v-col>

          <v-col class="mt-5" cols="12" md="4">
            <v-btn tile block elevation="2" large>create account</v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-10">
          <v-col cols="12" md="4">
            <v-card elevation="17" tile color="red">
              <v-card-title class="justify-center">PLEASE READ</v-card-title>
              <v-card-text class="text-center"
                >This web application is currently IN DEVELOPMENT. When registering, DO NOT use personal
                data or credentials. Thank you.</v-card-text
              >
            </v-card>
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
  name: "Register",

  data: () => ({
    valid: false,
    password: "",
    passwordRules: [
      (v: any) => !!v || "password is required",
      (v: any) => v.length >= 8 || "password must be at least 8 characters long."
    ],
    email: "",
    emailRules: [
      (v: any) => !!v || "e-mail is required",
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
