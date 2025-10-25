<script setup lang="ts">
import CodePreview from './components/CodePreview.vue'
import ThemePicker from "./components/ThemePicker.vue";
import Options from "./components/Options.vue";
</script>

<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar :elevation="5">
      <v-app-bar-title>Automation Studio Themer</v-app-bar-title>

      <v-tooltip text="Return to MRT.dev">
        <template v-slot:activator="{props}">
          <v-btn icon v-bind="props" :href="'https://mrt.dev'">
            <v-icon>mdi-home-account</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip text="See source on Github">
        <template v-slot:activator="{props}">
          <v-btn icon v-bind="props" :href="'https://github.com/michael-taylor/as-themer'">
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer class="pa-3">
      <v-list-item title="Pre-made themes"></v-list-item>
      <ThemePicker/>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">
      <v-list-item title="Options"></v-list-item>
      <Options/>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center">
      <v-container>
        <v-sheet
            class="pa-3"
            border="md"
            color="surface-light"
            rounded="lg"
            width="100%">
          <CodePreview/>
        </v-sheet>
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>

</style>
