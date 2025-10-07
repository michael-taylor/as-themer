<script module>
	import { createHighlighter } from "shiki";
	import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
	import defaultTheme from "../../themes/default.json";

	// Languages
	import c from "shiki/langs/c.mjs";

	// https://shiki.style/guide/sync-usage
	const shiki = await createHighlighter({
		engine: createJavaScriptRegexEngine(),
		themes: [],
		langs: [c],
	});
</script>

<script lang="ts">
	import type { CodeBlockProps } from "./types";

	let {
		code = "",
		lang = "c",
		themeName = "default",
		themeData = defaultTheme,
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
	shiki.loadThemeSync(themeData);
	const generatedHtml = shiki.codeToHtml(code, {
		lang: lang,
		theme: themeName
	});
</script>

<div class="{base} {rounded} {shadow} {classes} {preBase} {prePadding} {preClasses}">
	<!-- Output Shiki's Generated HTML -->
	{@html generatedHtml}
</div>
