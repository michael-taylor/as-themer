import type {Theme} from "./themes.ts";

function readTokens(line: string) : string[] {
    let tokenBuffer = "";
    let tokens: string[] = [];
    let inString = false;
    let inComment = false;
    let inNumber = false;

    [...line].forEach((c) => {
        if (inNumber) {
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c)) {
                tokenBuffer += c;
            } else {
                tokens.push(tokenBuffer);
                inNumber = false;
                tokenBuffer = c;
            }
        } else if (inComment) {
            tokenBuffer += c;
        } else if (inString) {
            tokenBuffer += c;
            if (c === "\"" || c === "'") {
                tokens.push(tokenBuffer);
                inString = false;
                tokenBuffer = "";
            }
        } else if (c === "\"" || c === "'") {
            inString = true;
            tokenBuffer += c;
        } else if (c === " ") {
            tokens.push(tokenBuffer);
            tokenBuffer = "";
            tokens.push(c);
        } else if (['(', ')', '+', '-', '*', '=', '{', '}', '[', ']', ',', ';'].includes(c)) {
            tokens.push(tokenBuffer);
            tokenBuffer = "";
            tokens.push(c);
        } else if (c == "/") {
            inComment = true;
            tokenBuffer = c;
        } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c)) {
            tokens.push(tokenBuffer);
            inNumber = true;
            tokenBuffer = c;
        } else {
            tokenBuffer += c;
        }
    });

    tokens.push(tokenBuffer);

    return tokens;
}

function isNumber(s: string) : boolean {
    return !isNaN(parseInt(s));
}

function isKeyword(s: string) : boolean {
    return ["void", "char", "int", "for", "sizeof", "return"].includes(s);
}

function isDatatype(s: string) : boolean {
    return ["UDINT", "DINT", "UINT", "INT", "STRING"].includes(s);
}

function isString(s: string) : boolean {
    return s.startsWith("\"") || s.startsWith("'");
}

function isComment(s: string) : boolean {
    return s.startsWith("//") || s.startsWith("/*");
}

function isOperator(s: string) : boolean {
    return ['(', ')', '+', '-', '*', '=', '{', '}', '[', ']', ',', ';'].includes(s);
}

export function themeC(code: string, theme: Theme) : string[] {
    // Perform theming (WARNING: very naive algorithm)

    let lines = code.split("\n");

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i] ?? "";

        if (line.trim().startsWith("#include")) {
            let re = /(&lt;.+&gt;)/g;
            // Replace the angle brackets for HTML
            line = line.replace("<", "&lt;").replace(">", "&gt;");
            line = line.replace(re, `<span style="color: ${theme.color("IncludeFiles")}">$1</span>`);
            line = line.replace("#include", `<span style="color: ${theme.color("Keyword")}">#include</span>`);
        } else {
            var tokens = readTokens(line);
            var newLine = "";

            tokens.forEach((t) => {
                if (t == "") {

                } else if (t == " ") {
                    newLine += " ";
                } else if (isNumber(t)) {
                    newLine += `<span style="color: ${theme.color("Number")}">${t}</span>`;
                } else if (isKeyword(t)) {
                    newLine += `<span style="color: ${theme.color("Keyword")}">${t}</span>`;
                } else if (isDatatype(t)) {
                    newLine += `<span style="color: ${theme.color("DataType")}">${t}</span>`;
                } else if (isString(t)) {
                    newLine += `<span style="color: ${theme.color("String")}">${t}</span>`;
                } else if (isComment(t)) {
                    newLine += `<span style="color: ${theme.color("Remark")}">${t}</span>`;
                } else if (isOperator(t)) {
                    newLine += `<span style="color: ${theme.color("Operator")}">${t}</span>`;
                } else {
                    newLine += `<span style="color: ${theme.foreground}">${t}</span>`;
                }
            })

            line = newLine + "\n";
        }

        lines[i] = line;
    }

    return lines;
}