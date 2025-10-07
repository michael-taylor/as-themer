<script module>
	import { createHighlighterCoreSync } from "shiki/core";
	import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
	// Themes
	import themeDarkPlus from "shiki/themes/dark-plus.mjs";
	// Languages
	import c from "shiki/langs/c.mjs";
	import console from "shiki/langs/console.mjs";

	// https://shiki.style/guide/sync-usage
	const shiki = createHighlighterCoreSync({
		engine: createJavaScriptRegexEngine(),
		// Implement your import theme.
		themes: [themeDarkPlus],
		// Implement your imported and supported languages.
		langs: [c, console],
	});
</script>

<script lang="ts">
	import type { CodeBlockProps } from "./types";

	let {
		code = "",
		lang = "console",
		theme = "dark-plus",
		// Base Style Props
		base = " overflow-hidden",
		rounded = "rounded-container",
		shadow = "",
		classes = "",
		// Pre Style Props
		preBase = "",
		prePadding = "[&>pre]:p-4",
		preClasses = "",
	}: CodeBlockProps = $props();

	// Shiki convert to HTML
	const generatedHtml = shiki.codeToHtml(code, { lang, theme });
</script>

<div class="{base} {rounded} {shadow} {classes} {preBase} {prePadding} {preClasses}">
	<!-- Output Shiki's Generated HTML -->
	{@html generatedHtml}
</div>
