import { reactive } from "vue";

export const theme = reactive({
    datatypes: {
        foreground: "#FF00FF",
    },
    numbers: {
        foreground: "#000000",
    },
    invalidKeywords: {
        foreground: "#FF0000",
    },
    keywords: {
        foreground: "#0000FF",
    },
    names: {
        foreground: "#000000",
    },
    comments: {
        foreground: "#008000",
    },
    strings: {
        foreground: "#FF00FF",
    },
    text: {
        foreground: "#000000",
    },
    selection: {
        foreground: "#000000",
        background: "#0000FF",
    },
    operators: {
        foreground: "#000000",
    },
    lineNumbers: {
        foreground: "#000000",
    },
    bracesHighlight: {
        foreground: "#FFFF00",
    },
    includeFiles: {
        foreground: "#800000",
    },
});