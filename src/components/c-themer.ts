import type {Theme} from "./theme.ts";

export function themeC(code: string, theme: Theme) : string[] {
    // Perform theming (WARNING: very naive algorithm)
    const keywords = ["void", "char", "int", "for", "sizeof", "return"] as const;
    const datatypes = ["UDINT", "DINT", "UINT", "INT", "STRING"] as const;

    let lines = code.split("\n");

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

    return lines;
}