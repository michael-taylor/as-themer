<script lang="ts">
	import { theme } from '../theme.svelte.js';
	let { children } = $props();
</script>

<span style="color: {theme.numberColor}">{@render children()}</span>
