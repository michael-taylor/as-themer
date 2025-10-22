<script setup lang="ts">
import {ref, shallowRef, watch} from "vue";
import {currentTheme} from "./theme.ts";
import {themeC} from "./c-themer.ts";
import exportTheme from "./exporter.ts";
import type {Theme} from "./themes.ts";

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
let dialog = shallowRef(false);

watch(currentTheme, (newTheme) => htmlOut = themeC(sampleCode, newTheme));

function onDownload() {
  const themeData = exportTheme(currentTheme.value as Theme);
  const themeBlob = new Blob([themeData], {type: "text/xml"});
  const themeUrl = URL.createObjectURL(themeBlob);
  const a = document.createElement("a");
  a.setAttribute("href", themeUrl);
  a.setAttribute("download", "Editor.set");
  a.style.display = "none";
  a.click();
  URL.revokeObjectURL(themeUrl);
  this.dialog.update(false);
}
</script>

<template>
  <div class="flex-column space-y-2">
    <div class="text-h4">Code preview</div>
    <div class="text-left space-y-2">
      <v-switch label="Monitor mode" v-model="monitorMode"></v-switch>
    </div>
    <div class="codePreview" :style="{background: monitorMode ? currentTheme.monitorBackground : currentTheme.background}">
      <table>
        <tr v-for="(line, index) in htmlOut">
          <td :style="{color: currentTheme.color('Linenumber')}">{{index+1}}</td>
          <td v-html="line"/>
        </tr>
      </table>
    </div>
    <v-container>
      <v-dialog v-model="dialog" ref="downloadDialog" max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
              v-bind="activatorProps"
              color="surface-variant"
              text="Download this theme"
              variant="flat"
          ></v-btn>
        </template>

<!--        <template v-slot:default="{ dialog }">-->
          <v-card title="Warning">
            <v-card-text>
              <p>
                This site is not responsible for any data loss. Make adequate backups before installing this theme.
              </p>
              <br>
              <p>
                Make sure that all instances of Automation Studio are closed. Copy the downloaded file as
                <b>Editor.set</b> to <b>???</b>. The downloaded theme attempts to keep all non-color options as their
                default value. If you've made changes to your editor settings, you may want to manually merge the
                downloaded file with your current one.
              </p>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="onDownload">Download</v-btn>
              <v-btn @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
<!--        </template>-->
      </v-dialog>
    </v-container>
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