<script setup lang="ts">
import {ref} from "vue";

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
</script>

<template>
  <div class="space-y-2">
    <div class="text-h4">Code preview</div>
    <div class="text-left space-y-2">
      <v-switch label="Monitor mode" v-model="monitorMode"></v-switch>
    </div>
    <pre class="codePreview">{{sampleCode}}</pre>
  </div>
</template>

<style scoped>
.codePreview {
  text-align: left;
}
</style>