<script>
  import { onMount } from "svelte";

  let categories = [];

  onMount(async () => {
    const response = await fetch(`http://127.0.0.1:4000/api/categories/`);
    const data = await response.json();

    categories = data;
  });
</script>

{#each categories as categorie}
  <div class="max-w-2xl mx-auto sm:px-6 lg:px-8 mt-4">
    <div class="overflow-hidden shadow-md">
      <div
        class="px-6 py-4 bg-white border-b border-gray-200 font-bold uppercase"
      >
        {categorie?.name}
      </div>

      <!-- card body -->
      <div class="p-6 bg-white border-b border-gray-200">
        {categorie?.description}
      </div>
    </div>
  </div>
{:else}
  <h1>no categories yet</h1>
{/each}
