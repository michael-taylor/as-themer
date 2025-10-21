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
    datatypes?: string,
    numbers?: string,
    keywords?: string,
    invalidKeywords?: string,
    names?: string,
    comments?: string,
    strings?: string,
    operators?: string,
    includeFiles?: string,
    lineNumbers?: string,
    bracesHighlight?: string,
    selectionText?: string,
    monitorBackground?: string,
}

export class Theme {
    name: string;
    foreground: string;
    background: string;
    colorMap: ColorMap;

    constructor(name: string, foreground: string, background: string, colormap: ColorMap = {}) {
        this.name = name;
        this.foreground = foreground;
        this.background = background;
        this.colorMap = colormap;
    }

    datatypes(): string {
        return this.colorMap.datatypes ?? this.foreground;
    }

    numbers(): string {
        return this.colorMap.numbers ?? this.foreground;
    }

    keywords(): string {
        return this.colorMap.keywords ?? this.foreground;
    }

    invalidKeywords(): string {
        return this.colorMap.invalidKeywords ?? this.foreground;
    }

    names(): string {
        return this.colorMap.names ?? this.foreground;
    }

    comments(): string {
        return this.colorMap.comments ?? this.foreground;
    }

    strings(): string {
        return this.colorMap.strings ?? this.foreground;
    }

    operators(): string {
        return this.colorMap.operators ?? this.foreground;
    }

    includeFiles(): string {
        return this.colorMap.includeFiles ?? this.foreground;
    }

    lineNumbers(): string {
        return this.colorMap.lineNumbers ?? this.foreground;
    }

    bracesHighlight(): string {
        return this.colorMap.bracesHighlight ?? this.foreground;
    }

    selection(): string {
        return this.colorMap.selectionText ?? this.foreground;
    }

    monitorBackground(): string {
        return this.colorMap.monitorBackground ?? Color(this.background).mix(Color("#FF0000"), 0.05).hex();
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
    return new Theme(theme.displayName, theme.colors["editor.foreground"], theme.colors["editor.background"], {
        datatypes: findColorForScope(theme, "entity.name.class")!,
        keywords: findColorForScope(theme, "keyword")!,
        invalidKeywords: findColorForScope(theme, "invalid")!,
        names: findColorForScope(theme, "variable")!,
        comments: findColorForScope(theme, "comment")!,
        strings: findColorForScope(theme, "string")!,
        operators: findColorForScope(theme, "keyword.operator") ?? findColorForScope(theme, "keyword")!,
        includeFiles: findColorForScope(theme, "header")!,
        lineNumbers: theme.colors["editorLineNumber.foreground"],
        bracesHighlight: theme.colors["editorBracketHighlight.foreground1"],
        selectionText: theme.colors["editor.selectionBackground"],
    });
}

export const themes = [
    new Theme("Automation Studio", "#000000", "#FFFFFF", {
        datatypes: "#FF00FF",
        keywords: "#0000FF",
        invalidKeywords: "#FF0000",
        comments: "#008000",
        strings: "#FF00FF",
        includeFiles: "#800000",
        bracesHighlight: "#FFFF00",
        monitorBackground: "#BBBBBB",
    }),
    themeFromTextMate(dracula as unknown as TextMateTheme),
    themeFromTextMate(github_dark as unknown as TextMateTheme),
    themeFromTextMate(github_light as unknown as TextMateTheme),
    themeFromTextMate(gruvbox_dark as unknown as TextMateTheme),
    themeFromTextMate(gruvbox_light as unknown as TextMateTheme),
    themeFromTextMate(solarized_dark as unknown as TextMateTheme),
    themeFromTextMate(solarized_light as unknown as TextMateTheme),
    themeFromTextMate(tokyonight as unknown as TextMateTheme),
]