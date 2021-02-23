// todo - create a v-alert for accounts that already exist in the database instead of a gerneal error.

<style lang="scss" scoped></style>

<template>
  <div id="register">
    <h2 class="text-center mb-10">register</h2>

    <v-form @submit.stop.prevent="register" v-model="valid">
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
              @click="register"
            >
              create account
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-10">
          <v-col cols="12">
            <!-- start:: Register Success Message  -->
            <v-alert v-if="successRegister" type="success" dense text dismissible>
              <div class="text-center">
                successfully registered!
              </div>
            </v-alert>
            <!-- end:: Register Success Message -->

            <!-- start:: Register Failure Message -->
            <v-alert v-if="errorRegister" type="error" dense text dismissible>
              <div class="text-center">
                there was a problem registering your account, please try again!
              </div>
            </v-alert>
            <!-- start:: Register Failure Message -->
          </v-col>
        </v-row>

        <v-row class="mt-10">
          <v-col cols="12">
            <v-alert type="warning" dense text>
              <h4 class="text-center">ATTENTION</h4>
              <div class="text-center">
                <div>
                  This application is currently <span class="font-weight-bold">in development.</span>
                </div>
                <div>
                  When registering, please <span class="font-weight-bold">do not</span> use personal data
                  or log in credentials.
                </div>
                <div>
                  Thank you!
                </div>
              </div>
            </v-alert>
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
import AuthService from "@/core/services/auth.service";
// Vuelidate
import { validationMixin } from "vuelidate";
import { email, required, minLength } from "vuelidate/lib/validators";

export default Vue.extend({
  mixins: [validationMixin],
  name: "Register",

  data: () => ({
    isLoading: false,
    errorRegister: false,
    successRegister: false,
    message: "",
    valid: false,
    password: "",
    email: ""
  }),

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },

  methods: {
    // todo - login the user if successfully registered, instead of routing them to login page.
    register: function(): void {
      // Check form for errors.
      this.$v.$touch();
      if (this.$v.$anyError) return;

      this.successRegister = false;
      this.errorRegister = false;

      const user: User = {
        email: this.email,
        password: this.password,
        settings: {
          darkMode: true
        },
        profile: {
          lists: []
        }
      };

      this.isLoading = true;
      Promise.resolve(AuthService.register(user)).then(res => {
        if (!res.user) {
          this.errorRegister = true;
          this.isLoading = false;
        } else {
          this.successRegister = true;
          this.isLoading = false;
          this.clearForm();

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
      const errors: any[] = [];
      if (!this.$v.$dirty) return errors;
      !this.$v.password.minLength && errors.push("password must be at least 8 characters long");
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
