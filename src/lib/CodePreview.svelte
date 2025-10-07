<script lang="ts">
	import CodeBlock from "./components/CodeBlock/CodeBlock.svelte";
	import defaultTheme from "./themes/default.json";
	import { theme } from "./theme.svelte";

	let monitorMode = $state(false);
	const sampleCode = `#include <bur/plctypes.h>

int main() {
    UDINT length = 256;
    STRING message[5];
    STRING *otherMessage = "Hello, World";
    int i;

    // The braces in this for loop will be highlighted
    for (i = 0; i < sizeof(message); i++) {
        message[i] = 0x00;
    }

    /* Another memory clear */
    brsmemset((UDINT) message, 0x00, sizeof(message));

    return length;
}`;
</script>

<div class="space-y-2">
	<h4 class="h4">Code preview</h4>
	<div class="text-left space-y-2">
		<label class="flex items-center space-x-2">
			<input class="checkbox" type="checkbox" />
			<p>Monitor mode</p>
		</label>
		<CodeBlock code={sampleCode} lang="c" themeData={defaultTheme} themeName="default" />
	</div>
</div>
