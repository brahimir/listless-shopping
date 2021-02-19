<style lang="scss" scoped></style>

<template>
  <div id="login">
    <h2 class="text-center mb-10">sign in</h2>

    <v-form @submit.stop.prevent="login" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" xl="4">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="email"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" xl="4">
            <v-text-field
              type="password"
              v-model="password"
              :error-messages="passwordErrors"
              label="password"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
          </v-col>

          <v-col class="mt-5" cols="12" xl="4">
            <v-btn
              tile
              block
              elevation="2"
              large
              :loading="isLoading"
              :disabled="isLoading || $v.$invalid"
              color="success"
              @click="login"
            >
              sign in
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-10">
          <v-col cols="12" xl="4">
            <!-- start:: Login Failure Message -->
            <v-card v-if="errorLogin" elevation="17" tile color="danger">
              <v-card-title class="justify-center">uh oh!</v-card-title>
              <v-card-text class="text-center">
                invalid username or password. please try again.
              </v-card-text>
            </v-card>
            <!-- start:: Login Failure Message -->
          </v-col>
        </v-row>

        <v-row class="text-center">
          <v-col cols="12" xl="4">
            <p>
              don't have an account?
            </p>
            <p><router-link to="/register">sign up here</router-link></p>
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
// Vuelidate
import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";

export default Vue.extend({
  mixins: [validationMixin],
  name: "Register",

  data: () => ({
    isLoading: false,
    errorLogin: false,
    message: "",
    valid: false,
    password: "",
    email: ""
  }),

  validations: {
    email: { required, email },
    password: { required }
  },

  methods: {
    login: function(): void {
      // Check form for errors.
      this.$v.$touch();
      if (this.$v.$anyError) return;

      const credentials: any = {
        email: this.email,
        password: this.password
      };

      this.isLoading = true;
      Promise.resolve(AuthService.login(credentials)).then(data => {
        if (data) {
          const user: User = data;
          console.log(user);
          this.isLoading = false;
        } else {
          this.errorLogin = true;
          this.isLoading = false;
        }
      });
    },

    clearForm: function(): void {
      this.$v.$reset();
      this.password = "";
      this.email = "";
    }
  },

  computed: {
    passwordErrors() {
      const errors: any[] = [];
      if (!this.$v.$dirty) return errors;
      !this.$v.password.required && errors.push("enter your password");
      return errors;
    },
    emailErrors() {
      const errors: any[] = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("enter a valid email");
      !this.$v.email.required && errors.push("enter your email");
      return errors;
    }
  }
});
</script>
