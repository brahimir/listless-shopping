<style lang="scss" scoped></style>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" dark>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="dialogButtonColor"
          :block="dialogButtonIsBlock"
          :tile="dialogButtonIsTile"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{ dialogButtonText }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">{{ headerTitle }}</v-card-title>
        <v-card-text>{{ confirmationMessage }}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" tile @click="onSubmit">
            {{ acceptText }}
          </v-btn>
          <v-btn color="red darken-1" tile outlined @click="dialog = false">
            {{ declineText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ConfirmationDialog",
  props: [
    "dialogButtonText",
    "dialogButtonColor",
    "dialogButtonIsBlock",
    "dialogButtonIsTile",
    "headerTitle",
    "confirmationMessage",
    "acceptText",
    "declineText"
  ],

  data: () => ({
    dialog: false
  }),

  methods: {
    onSubmit: function(): void {
      this.$emit("is-confirmed", true);
      this.dialog = false;
    }
  }
});
</script>
