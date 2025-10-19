<script setup lang="ts">
import {ref} from "vue";
import {theme} from "./theme.ts";

const keywords = ["void", "char", "int", "for", "sizeof", "return"] as const;
const datatypes = ["UDINT", "DINT", "UINT", "INT", "STRING"] as const;

let monitorMode = ref<Boolean>(false);
const sampleCode = `#include &lt;bur/plctypes.h&gt;

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

// Perform theming (WARNING: very naive algorithm)
let lines = sampleCode.split("\n");

for (let i = 0; i < lines.length; i++) {
  // We're assuming multi-line comments are not going to be multi-line in this sample code.
  if ((lines[i]?.trim().startsWith("//")) || (lines[i]?.trim().startsWith("/*") && lines[i]?.trim().endsWith("*/"))) {
    lines[i] = `<span style="color: ${theme.comments.foreground}">${lines[i]}</span>`;
  } else if (lines[i]?.trim().startsWith("#include")) {
    lines[i] = lines[i]?.replace("#include", `<span style="color: ${theme.keywords.foreground}">#include</span>`) ?? "";
    let re = RegExp("(&lt;.+&gt;)", "g");
    lines[i] = lines[i]?.replace(re, `<span style="color: ${theme.includeFiles.foreground}">$1</span>`) ?? "";
  } else {
    let stringRegExp = RegExp("(\".+\")", "g");
    lines[i] = lines[i]?.replace(stringRegExp, `<span style="color: ${theme.strings.foreground}">$1</span>`) ?? "";
    keywords.forEach((value) => {
      let re = RegExp(value, "g");
      lines[i] = lines[i]?.replace(re, `<span style="color: ${theme.keywords.foreground}">${value}</span>`) ?? "";
    });
    datatypes.forEach((value) => {
      let re = RegExp(value, "g");
      lines[i] = lines[i]?.replace(re, `<span style="color: ${theme.datatypes.foreground}">${value}</span>`) ?? "";
    });
    // TODO: Need to figure out how to add '=', '<', and '>' without messing up HTML
    let operatorRegExp = /([\(\)\+\-\*{}\[\];,])/g;
    lines[i] = lines[i]?.replace(operatorRegExp, `<span style="color: ${theme.operators.foreground}">$1</span>`) ?? "";
  }
}

let htmlOut = lines.join("\n");
</script>

<template>
  <div class="space-y-2">
    <div class="text-h4">Code preview</div>
    <div class="text-left space-y-2">
      <v-switch label="Monitor mode" v-model="monitorMode"></v-switch>
    </div>
    <pre class="codePreview" v-html="htmlOut"></pre>
  </div>
</template>

<style scoped>
.codePreview {
  text-align: left;
}
</style>