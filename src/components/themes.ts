import Color from 'color';
import dracula from "tm-themes/themes/dracula.json";
import github_dark from "tm-themes/themes/github-dark.json";
import github_light from "tm-themes/themes/github-light.json";
import gruvbox_dark from "tm-themes/themes/gruvbox-dark-medium.json";
import gruvbox_light from "tm-themes/themes/gruvbox-light-medium.json";
import solarized_dark from "tm-themes/themes/solarized-dark.json";
import solarized_light from "tm-themes/themes/solarized-light.json";
import tokyonight from "tm-themes/themes/tokyo-night.json";

interface TextMateTheme {
    displayName: string,
    colors: {
        "editor.foreground": string,
        "editor.background": string,
        "editorLineNumber.foreground": string,
        "editorBracketHighlight.foreground1": string,
        "editor.selectionBackground": string,
    },
    tokenColors: [{
        scope: string[] | string,
        settings: {
            foreground?: string,
        }
    }]
}

interface ColorMap {
    "DataType"?: string,
    "Number"?: string,
    "Keyword"?: string,
    "InvalidKeyword"?: string,
    "Name"?: string,
    "Remark"?: string,
    "String"?: string,
    "Operator"?: string,
    "IncludeFiles"?: string,
    "Linenumber"?: string,
    "BracesHighlight"?: string,
    "TextSelection"?: string,
    "PrintPageBoundaries"?: string,
    "FormFeed"?: string,
    "LineModificatorChange"?: string,
    "LineModificatorSave"?: string,
    "HypertextUrlHighlight"?: string,
    "CodeSnippets"?: string,
    "ColumnIndentation"?: string,
    "Errors"?: string,
    "Warnings"?: string,
    "Equal"?: string,
    "Similar"?: string,
    "InLeftPaneOnly"?: string,
    "InRightPaneOnly"?: string,
    "Different"?: string,
    "DifferentContent"?: string,
    "DifferentDetails"?: string,
    "DifferentBlockItem"?: string,
    "IncomparableBlockItem"?: string,
    "NoHwInfo"?: string,
    "LadderPowerFlow"?: string,
    "Value"?: string,
    "ForceValue"?: string,
    "ArchiveValue"?: string,
    "RootNodeColor"?: string,
    "InactiveValue"?: string,
    "SFCTransition"?: string,
}

export class Theme {
    name: string;
    foreground: string;
    background: string;
    monitorBackground: string;
    selectionBackground: string;
    colorMap: ColorMap;
    defaultColorMap = {
        "DataType": "#FF00FF",
        "Number": "#000000",
        "Keyword": "#0000FF",
        "InvalidKeyword": "#FF0000",
        "Name": "#000000",
        "Remark": "#008000",
        "String": "#FF00FF",
        "Operator": "#000000",
        "IncludeFiles": "#800000",
        "Linenumber": "#000000",
        "BracesHighlight": "#FFFF00",
        "TextSelection": "#000000",
        "PrintPageBoundaries": "#008000",
        "FormFeed": "#FF0000",
        "LineModificatorChange": "#FFFF00",
        "LineModificatorSave": "#008000",
        "HypertextUrlHighlight": "#0000FF",
        "CodeSnippets": "#B41CB4",
        "ColumnIndentation": "#D3D3D3",
        "Equal": "#000000",
        "Similar": "#CD5C5C",
        "InLeftPaneOnly": "#0000FF",
        "InRightPaneOnly": "#008000",
        "Different": "#FF0000",
        "DifferentContent": "#008B8B",
        "DifferentDetails": "#DA70D6",
        "DifferentBlockItem": "#FF0000",
        "IncomparableBlockItem": "#FFA500",
        "NoHwInfo": "#5F9EA0",
        "Errors": "#FF0000",
        "Warnings": "#008000",
        "LadderPowerFlow": "#0000FF",
        "Value": "#000000",
        "ForceValue": "#FF0000",
        "ArchiveValue": "#008000",
        "RootNodeColor": "#0000FF",
        "InactiveValue": "#A9A9A9",
        "SFCTransition": "#0000FF",
    }

    constructor(
        name: string,
        foreground: string = "#000000",
        background: string = "#FFFFFF",
        selectionBackground: string = "#0000FF",
        monitorBackground: string = "#888888",
        colormap: ColorMap = {}) {
        this.name = name;
        this.foreground = foreground;
        this.background = background;
        this.selectionBackground = selectionBackground;
        this.monitorBackground = monitorBackground;
        this.colorMap = colormap;
    }

    color(name: string): string {
        return this.colorMap[name] ?? this.defaultColorMap[name] ?? "#000000";
    }
}

function findColorForScope(theme: TextMateTheme, scope: string) : string | null {
    let found = theme.tokenColors.find((element) => element.scope?.includes(scope));
    if (found != null) {
        return found.settings.foreground ?? null;
    } else {
        return null;
    }
}

function themeFromTextMate(theme: TextMateTheme) : Theme {
    // Calculate a monitor background by tinting the normal background reddish
    return new Theme(
        theme.displayName,
        theme.colors["editor.foreground"],
        theme.colors["editor.background"],
        theme.colors["editor.selectionBackground"],
        Color(theme.colors["editor.background"]).mix(Color("#FF0000"), 0.05).hex(),
        {
            "DataType": findColorForScope(theme, "entity.name.class")!,
            "Number": findColorForScope(theme, "constant")!,
            "Keyword": findColorForScope(theme, "keyword")!,
            "InvalidKeyword": findColorForScope(theme, "invalid")!,
            "Name": findColorForScope(theme, "variable")!,
            "Remark": findColorForScope(theme, "comment")!,
            "String": findColorForScope(theme, "string")!,
            "Operator": findColorForScope(theme, "keyword.operator") ?? findColorForScope(theme, "keyword")!,
            "IncludeFiles": findColorForScope(theme, "header")!,
            "Linenumber": theme.colors["editorLineNumber.foreground"],
            "BracesHighlight": theme.colors["editorBracketHighlight.foreground1"],
            "TextSelection": theme.colors["editor.selectionBackground"],
    });
}

export const themes = [
    new Theme("Automation Studio default"),
    themeFromTextMate(dracula as unknown as TextMateTheme),
    themeFromTextMate(github_dark as unknown as TextMateTheme),
    themeFromTextMate(github_light as unknown as TextMateTheme),
    themeFromTextMate(gruvbox_dark as unknown as TextMateTheme),
    themeFromTextMate(gruvbox_light as unknown as TextMateTheme),
    themeFromTextMate(solarized_dark as unknown as TextMateTheme),
    themeFromTextMate(solarized_light as unknown as TextMateTheme),
    themeFromTextMate(tokyonight as unknown as TextMateTheme),
]