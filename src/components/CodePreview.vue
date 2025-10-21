<script setup lang="ts">
import {ref, watch} from "vue";
import {currentTheme} from "./theme.ts";
import {themeC} from "./c-themer.ts";

let monitorMode = ref<Boolean>(false);
const sampleCode = `#include <bur/plctypes.h>

int main() {
    UDINT length = 256;
    STRING message[5];
    STRING *otherMessage = "Hello, World";
    int i;

    // The braces in this for loop will be highlighted
    for (i = 0; i < sizeof(message); i++) {
        message[i] = 0x00;
    }

    /* Another memory clear */
    brsmemset((UDINT) message, 0x00, sizeof(message));

    return length;
}`

let htmlOut = themeC(sampleCode, currentTheme.value);

watch(currentTheme, (newTheme) => htmlOut = themeC(sampleCode, newTheme));
</script>

<template>
  <div class="space-y-2">
    <div class="text-h4">Code preview</div>
    <div class="text-left space-y-2">
      <v-switch label="Monitor mode" v-model="monitorMode"></v-switch>
    </div>
    <div class="codePreview" :style="{background: monitorMode ? currentTheme.monitorBackground() : currentTheme.background}">
      <table>
        <tr v-for="(line, index) in htmlOut">
          <td :style="{color: currentTheme.lineNumbers()}">{{index+1}}</td>
          <td v-html="line"/>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.codePreview {
  text-align: left;
  white-space: pre;
  font-family: monospace;
}
.codePreview td {
  padding-left: 5px;
  padding-right: 5px;
}
</style>