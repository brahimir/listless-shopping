<style lang="scss" scoped>
.isChecked {
  text-decoration: line-through;
}

.v-sheet {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.checked {
  background-color: #161616;
  border: 1px solid #161616;
}
</style>

<template>
  <div class="mx-3 my-10">
    <v-row justify="center">
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
          <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Open Dialog
          </v-btn> -->

          <!-- start:: Create new List Button -->
          <v-btn color="success" block tile v-on="on">create new list</v-btn>
          <!-- end:: Create new List Button -->
        </template>
        <v-card>
          <!-- start:: Toolbar -->
          <v-toolbar dark color="secondary">
            <v-toolbar-title>create new list</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <!-- start:: Toolbar -->

          <!-- start:: Create List Form -->
          <v-list three-line subheader>
            <v-subheader>User Controls</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Content filtering</v-list-item-title>
                <v-list-item-subtitle
                  >Set the content filtering level to restrict apps that can be
                  downloaded</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Password</v-list-item-title>
                <v-list-item-subtitle
                  >Require password for purchase or use password to restrict
                  purchase</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <div class="mx-3 my-10">
            <v-btn class="my-3" color="success" block @click="onSubmit">
              create
            </v-btn>
            <v-btn class="my-3" color="error" block @click="dialog = false">
              cancel
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
// Vue
import Vue from "vue";
// Models
import { List } from "@/views/pages/home/_models/list.model";
// Services
import HomeService from "@/views/pages/home/Home.service";

export default Vue.extend({
  name: "CreateList",

  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false
  }),

  methods: {
    onSubmit: function(): void {
      console.log("NICE");
      this.dialog = false;
      // todo
    }
  }
});
</script>
