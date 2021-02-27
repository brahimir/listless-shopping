// todo - create a v-alert for accounts that already exist in the database instead of a gerneal error. //
todo - add a confirm password field.
<style lang="scss" scoped></style>

<template>
  <div id="register">
    <h2 class="text-center mb-10">register</h2>

    <v-form @submit.stop.prevent="register" v-model="valid">
      <v-container>
        <v-row>
          <!-- start:: Email -->
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
          <!-- end:: Email -->

          <!-- start:: Password -->
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
          <!-- end:: Password -->

          <!-- start:: Confirm Password -->
          <v-col cols="12">
            <v-text-field
              type="password"
              v-model="confirmPassword"
              :error-messages="confirmPasswordErrors"
              label="confirm password"
              required
              @input="$v.confirmPassword.$touch()"
              @blur="$v.confirmPassword.$touch()"
            ></v-text-field>
          </v-col>
          <!-- end:: Confirm Password -->

          <!-- start:: Verify Credentials -->
          <v-col>
            <v-checkbox
              v-model="checkbox"
              :error-messages="checkboxErrors"
              label="I have not entered any personal credentials during registration"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox>
          </v-col>
          <!-- start:: Verify Credentials -->

          <!-- start:: Submit -->
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
          <!-- start:: Submit -->
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
    valid: false,
    email: "",
    password: "",
    confirmPassword: "",
    checkbox: false
  }),

  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(8),
      valid: function(value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        const containsSpecial = /[#?!@$%^&*-]/.test(value);
        return containsUppercase && containsLowercase && containsNumber && containsSpecial;
      }
    },
    confirmPassword: {
      required,
      valid: function(value) {
        if (value === this.password) return true;
        else return false;
      }
    },
    checkbox: {
      checked(val) {
        return val;
      }
    }
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
          lists: [],
          // eslint-disable-next-line @typescript-eslint/camelcase
          archived_lists: []
        }
      };

      const credentials = {
        email: user.email,
        password: user.password
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

          this.isLoading = true;
          Promise.resolve(AuthService.login(credentials)).then((user: User) => {
            if (!user) {
              this.isLoading = false;
            } else {
              this.isLoading = false;
              this.clearForm();

              // Update store and route to Home.
              this.$store.dispatch("LOGIN", user);
              this.$router.push("/home");
            }
          });
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
    emailErrors() {
      const errors: string[] = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("enter a valid email");
      !this.$v.email.required && errors.push("enter your email");
      return errors;
    },
    passwordErrors() {
      const errors: string[] = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("password must be at least 8 characters long");
      !this.$v.password.valid &&
        errors.push("password must contain an uppercase letter, a number, and a special character");
      !this.$v.password.required && errors.push("enter your password");
      return errors;
    },
    confirmPasswordErrors() {
      const errors: string[] = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.valid && errors.push("passwords much match");
      !this.$v.confirmPassword.required && errors.push("enter your password again");
      return errors;
    },
    checkboxErrors() {
      const errors: string[] = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("you must agree to continue");
      return errors;
    }
  }
});
</script>
