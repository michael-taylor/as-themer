<script lang="ts">
	import Keyword from './syntax/Keyword.svelte'
	import Datatype from './syntax/Datatype.svelte'
	import Include from './syntax/Include.svelte'
	import String from './syntax/String.svelte'
	import Comment from './syntax/Comment.svelte'
	import Number from './syntax/Number.svelte'
	import Op from './syntax/Op.svelte'
	import { theme } from './theme.svelte'
	import { Checkbox, Heading } from "flowbite-svelte";

	let monitorMode = $state(false);
</script>

<div class="container">
	<Heading tag="h2">Code preview</Heading>
	<Checkbox bind:checked={monitorMode}>Monitor mode</Checkbox>
	<pre class="codeArea" 
		style:background={monitorMode ? theme.monitorBackground : theme.background}
		style:color={theme.normalColor}>
<Keyword>#include</Keyword> <Include>&lt;bur/plctypes.h&gt;</Include>

<Keyword>int</Keyword> main<Op>() {'{'}</Op>
    <Datatype>UDINT</Datatype> length <Op>=</Op> <Number>256</Number>;
    <Datatype>STRING</Datatype> message[<Number>5</Number>];
    <Datatype>STRING</Datatype> *otherMessage <Op>=</Op> <String>"Hello, World"</String>;
    <Keyword>int</Keyword> i;

    <Comment>// The braces in this for loop will be highlighted</Comment>
    <Keyword>for</Keyword> (i <Op>=</Op> <Number>0</Number>; i <Op>{'<'}</Op> <Keyword>sizeof</Keyword>(message); i<Op>++</Op>) <Op hasMatch={true}>{'{'}</Op>
        message[i] <Op>=</Op> <Number>0x00</Number>;
    <Op hasMatch={true}>{'}'}</Op>

    <Comment>/* Another memory clear */</Comment>
    brsmemset((<Datatype>UDINT</Datatype>) message, <Number>0x00</Number>, <Keyword>sizeof</Keyword>(message));

    <Keyword>return</Keyword> length;
<Op>{'}'}</Op>
</pre>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		text-align: left;
	}

	.codeArea { 
		padding: 10px;
		text-align: left;
		font-size: 12pt;
	}
</style>
