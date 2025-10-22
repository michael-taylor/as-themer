import type {Theme} from "./themes.ts";
import {XMLBuilder} from "fast-xml-parser";

export default function exportTheme(theme: Theme): string {
    const options = {
        format: true,
        attributeNamePrefix: "@",
        ignoreAttributes: false,
    }
    const builder = new XMLBuilder(options);
    let xmlTheme = {
        "EditorSettings": {
            "Categories": {

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