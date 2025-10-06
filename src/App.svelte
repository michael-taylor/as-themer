<script lang="ts">
  import CodePreview from './lib/CodePreview.svelte'
  import { Heading } from 'flowbite-svelte'
</script>

<div class="dark:bg-gray-800 text-center p-8">
  <Heading tag="h1" class="mb-4 text-4xl font-extrabold  md:text-5xl lg:text-6xl">
    Automation Studio Color Themer
  </Heading>
  <div class="container">
    <CodePreview />
  </div>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    column-gap: 30px;
  }
</style>
