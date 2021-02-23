<style lang="scss" scoped></style>

<template>
  <div id="login">
    <h2 class="text-center mb-10">sign in</h2>

    <v-form @submit.stop.prevent="login" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="email"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
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

          <v-col class="mt-5" cols="12">
            <v-btn
              type="submit"
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
          <v-col cols="12">
            <!-- start:: Login Failure Message -->
            <v-alert v-if="errorLogin" type="error" dense text dismissible>
              <div class="text-center">
                invalid username or password. please try again.
              </div>
            </v-alert>
            <!-- start:: Login Failure Message -->

            <!-- start:: Login Success Message -->
            <v-alert v-if="successLogin" type="success" dense text>
              <div class="text-center">
                successfully logged in!
              </div>
            </v-alert>
            <!-- start:: Login Success Message -->
          </v-col>
        </v-row>

        <v-row class="text-center mt-5">
          <v-col cols="12">
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
// Vue
import Vue from "vue";
// Vuelidate
import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";
// Models
import { User } from "@/core/_models/user.model";
// Services
import AuthService from "@/core/services/auth.service";

export default Vue.extend({
  mixins: [validationMixin],
  name: "Register",

  data: () => ({
    isLoading: false,
    errorLogin: false,
    successLogin: false,
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

      this.errorLogin = false;

      const credentials = {
        email: this.email,
        password: this.password
      };

      this.isLoading = true;
      Promise.resolve(AuthService.login(credentials)).then((user: User) => {
        if (!user) {
          this.errorLogin = true;
          this.isLoading = false;
        } else {
          this.successLogin = true;
          this.isLoading = false;
          this.clearForm();

          console.log(user);

          // Update store and route to Home.
          this.$store.dispatch("LOGIN", user);
          this.$router.push("/home");
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
      const errors: string[] = [];
      if (!this.$v.$dirty) return errors;
      !this.$v.password.required && errors.push("enter your password");
      return errors;
    },
    emailErrors() {
      const errors: string[] = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("enter a valid email");
      !this.$v.email.required && errors.push("enter your email");
      return errors;
    }
  }
});
</script>
