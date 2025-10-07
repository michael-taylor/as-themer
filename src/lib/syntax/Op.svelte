<script lang="ts">
	import { theme } from '../theme.svelte.js';
	let { children, hasMatch = false } = $props();
</script>

<span 
	style:color = {hasMatch ? theme.normalColor : theme.operatorColor}
	style:background = {hasMatch ? theme.bracesHighlightColor : theme.background}>{@render children()}</span>
