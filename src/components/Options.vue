<script setup lang="ts">
import {currentTheme} from "./theme.ts"

</script>

<template>
  <v-container>
    <v-number-input label="Tab width"
                    control-variant="stacked"
                    :min="0" :max="20"
                    v-model="currentTheme.options.tabWidth" />
    <v-checkbox label="Show whitespace" v-model="currentTheme.options.showWhitespace"></v-checkbox>
    <v-checkbox label="Replace tabs" v-model="currentTheme.options.replaceTabs"/>
    <v-checkbox label="Show line numbers" v-model="currentTheme.options.showLineNumbers"/>
    <v-checkbox label="Auto format" v-model="currentTheme.options.autoFormat"/>
  </v-container>
</template>

<style scoped>

</style>