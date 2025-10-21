import { ref } from "vue";
import { themes } from "./themes.ts";

export const currentTheme = ref(themes[0]);