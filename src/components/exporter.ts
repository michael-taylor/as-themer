import type {Theme} from "./themes.ts";
import {XMLBuilder} from "fast-xml-parser";
import Color from "color";

function buildItem(name: string, color?: string): {} {
    if (color != null) {
        return {
            "@Name": name,
            "ForeColor": {
                "@Red": Color(color).red().toString(),
                "@Green": Color(color).green().toString(),
                "@Blue": Color(color).blue().toString()
            }
        };
    } else {
        return {
            "@Name": name
        };
    }
}

function buildCategory(name: string, fontName: string, fontSize: number, fontStyle: string, colors: { [key: string] : string },
                       backgroundColor?: string, monitorColor?: string, highlightColor?: string): {} {
    let category: { [id: string] : {} | string } = {
        "@Name": name,
        "Font": {
            "@Name": fontName,
            "@Size": fontSize,
            "@Style": fontStyle
        }
    };

    if (backgroundColor != null) {
        category["BackColor"] = {
            "@Red": Color(backgroundColor).red().toString(),
            "@Green": Color(backgroundColor).green().toString(),
            "@Blue": Color(backgroundColor).blue().toString()
        }
    }

    if (monitorColor != null) {
        category["MonitorBackColor"] = {
            "@Red": Color(monitorColor).red().toString(),
            "@Green": Color(monitorColor).green().toString(),
            "@Blue": Color(monitorColor).blue().toString()
        }
    }

    if (highlightColor != null) {
        category["SelectionBackColor"] = {
            "@Red": Color(highlightColor).red().toString(),
            "@Green": Color(highlightColor).green().toString(),
            "@Blue": Color(highlightColor).blue().toString()
        }
    }

    let items: {}[] = [];
    Object.entries(colors).forEach((key_value) => {
        items.push(buildItem(key_value[0], key_value[1]));
    })

    category["Items"] = {
        "Item": items
    }

    return category;
}

function createCategory(name: string, fontName: string, fontSize: number, fontStyle: string, theme: Theme,
                        items: string[]): {} {
    let colors:{ [id: string] : string } = {};
    items.forEach((item) => {
        colors[item] = theme.color(item)
    });

    return buildCategory(name, fontName, fontSize, fontStyle, colors, theme.background, theme.monitorBackground,
        theme.selectionBackground);
}

export default function exportTheme(theme: Theme): string {
    let categories = [];

    categories.push(createCategory("Editor", "Microsoft Sans Serif", 8, "Regular", theme,
  [
            "DataType",
            "Number",
            "InvalidKeyword",
            "Keyword",
            "Name",
            "Remark",
            "String",
            "Text",
            "TextSelection",
            "Operator",
            "Linenumber",
            "PrintPageBoundaries",
            "FormFeed"
        ]));
    categories.push(createCategory("TextEditor", "Courier New", 10, "Regular", theme,
        [
            "DataType",
            "Number",
            "InvalidKeyword",
            "Keyword",
            "Name",
            "Remark",
            "String",
            "Text",
            "TextSelection",
            "Operator",
            "Linenumber",
            "PrintPageBoundaries",
            "LineModificatorChange",
            "LineModificatorSave",
            "BracesHighlight",
            "HypertextUrlHighlight",
            "CodeSnippets",
            "ColumnIndentation",
            "IncludeFiles"
        ]));
    // ...
    categories.push(createCategory("ProjectExplorer", "Microsoft Sans Serif", 8,
        "Regular", theme, [
            "Text",
            "TextSelection"
        ]));
    categories.push(createCategory("Output", "Microsoft Sans Serif", 8, "Regular",
        theme, [
            "Errors",
            "Warnings",
            "Text"
        ]));
    // ...
    categories.push(createCategory("PropertyWindow", "Microsoft Sans Serif", 8, "Regular",
        theme, [
            "Text",
            "TextSelection",
            "GroupBackgroundColor"
        ]));

    const options = {
        format: true,
        attributeNamePrefix: "@",
        ignoreAttributes: false,
        suppressBooleanAttributes: false,
    };
    const builder = new XMLBuilder(options);
    let xmlTheme = {
            "EditorSettings": {
                "@TabWidth": theme.options.tabWidth,
                "@SyntaxColoring": "true",
                "@Intellisense": "true",
                "@AutoDeclare": "false",
                "@ShowWhiteSpace": theme.options.showWhitespace,
                "@ReplaceTabs": theme.options.replaceTabs,
                "@IndentMode": "Smart",
                "@VirtualWhiteSpace": "false",
                "@ShowLineNumbers": theme.options.showLineNumbers,
                "@AutoFormat": theme.options.autoFormat,
                "@PromptBeforeDrag": "false",
                "@FilteredDescription": "false",
                "@WordWrapping": "false",
                "@Outlining": "true",
                "@ShowLineModifications": "true",
                "@ShowHypertext": "true",
                "@xmlns": "http://br-automation.co.at/AS/EditorSettings",
                "Categories": {
                    "Category": categories
                },
                "DefaultEditors": {
                    "DefaultEditor": [
                        { "@Extension": "c", "@Format": "Text" },
                        { "@Extension": "i", "@Format": "Text" },
                        { "@Extension": "h", "@Format": "Text" },
                        { "@Extension": "a", "@Format": "Text" },
                        { "@Extension": "s", "@Format": "Text" },
                        { "@Extension": "cpp", "@Format": "Text" },
                        { "@Extension": "c++", "@Format": "Text" },
                        { "@Extension": "cc", "@Format": "Text" },
                        { "@Extension": "cp", "@Format": "Text" },
                        { "@Extension": "cxx", "@Format": "Text" },
                        { "@Extension": "ii", "@Format": "Text" },
                        { "@Extension": "hpp", "@Format": "Text" },
                        { "@Extension": "hh", "@Format": "Text" },
                        { "@Extension": "dat", "@Format": "Text" },
                        { "@Extension": "txt", "@Format": "Text" },
                        { "@Extension": "xml", "@Format": "Text" },
                        { "@Extension": "fun", "@Format": "Table" },
                        { "@Extension": "var", "@Format": "Table" },
                        { "@Extension": "typ", "@Format": "Table" },
                        { "@Extension": "iom", "@Format": "Table" },
                        { "@Extension": "per", "@Format": "Table" },
                        { "@Extension": "vvm", "@Format": "Table" },
                        { "@Extension": "cnc", "@Format": "Text" },
                        { "@Extension": "ab", "@Format": "Text" },
                        { "@Extension": "st", "@Format": "Text" },
                        { "@Extension": "il", "@Format": "Text" },
                        { "@Extension": "ld", "@Format": "Grafic" },
                        { "@Extension": "rpt", "@Format": "Table" },
                        { "@Extension": "tt", "@Format": "Table" },
                        { "@Extension": "zpt", "@Format": "Table" },
                        { "@Extension": "ax", "@Format": "Table" },
                        { "@Extension": "vax", "@Format": "Table" },
                        { "@Extension": "cns", "@Format": "Table" },
                        { "@Extension": "ncc", "@Format": "Table" },
                        { "@Extension": "ett", "@Format": "Table" },
                        { "@Extension": "hwl", "@Format": "Grafic" },
                        { "@Extension": "sw", "@Format": "Table" },
                        { "@Extension": "hw", "@Format": "Table" },
                        { "@Extension": "ncm", "@Format": "Table" },
                        { "@Extension": "apt", "@Format": "Table" },
                        { "@Extension": "opcm", "@Format": "Table" },
                        { "@Extension": "opcc", "@Format": "Table" },
                        { "@Extension": "opct", "@Format": "Table" },
                        { "@Extension": "opcp", "@Format": "Table" },
                        { "@Extension": "opca", "@Format": "Table" },
                        { "@Extension": "textconfig", "@Format": "Table" },
                        { "@Extension": "language", "@Format": "Table" },
                        { "@Extension": "uad", "@Format": "Table" },
                        { "@Extension": "uanodeset", "@Format": "Text" },
                        { "@Extension": "uam", "@Format": "Table" },
                    ]
                }
            }
        };

    return builder.build(xmlTheme);
}