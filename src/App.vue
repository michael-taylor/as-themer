<script setup lang="ts">
import CodePreview from './components/CodePreview.vue'
import ThemePicker from "./components/ThemePicker.vue";
</script>

<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar color="surface-variant" title="Automation Studio Themer"></v-app-bar>

    <v-navigation-drawer class="pa-3">
      <v-list-item title="Pre-made themes"></v-list-item>
      <ThemePicker/>
    </v-navigation-drawer>

<!--    <v-navigation-drawer location="right">-->
<!--      <v-list-item title="Drawer right"></v-list-item>-->
<!--    </v-navigation-drawer>-->

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
