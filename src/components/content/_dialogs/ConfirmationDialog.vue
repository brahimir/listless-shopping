<style lang="scss" scoped></style>

<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ headerTitle }}
        </v-card-title>

        <v-card-text>
          {{ confirmationMessage }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            {{ acceptText }}
          </v-btn>
          <v-btn color="primary" text @click="dialog = false">
            {{ declineText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["model", "headerTitle", "confirmationMessage", "acceptText", "declineText"],
  data: () => {}
};
</script>
