import { reactive } from "vue";
import { themes } from "./themes.ts";

export const currentTheme = reactive(themes.dracula);