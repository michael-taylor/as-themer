<script setup lang="ts">
import {themes} from "./themes.ts";
import {currentTheme} from "./theme.ts";

const allThemes = themes;
</script>

<template>
  <v-container>
    <v-select
        label="Theme"
        v-model="currentTheme"
        :items="allThemes"
        item-title="name"
        return-object></v-select>
  </v-container>
</template>

<style scoped>

</style>