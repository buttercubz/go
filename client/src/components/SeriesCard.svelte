<script>
  import { onMount } from "svelte";
  import Card from "./Card.svelte";

  export let series = [];
  export let custom = false;
  export let title = "Series";
  export let id = "";

  if (custom) {
    onMount(async () => {
      const response = await fetch("http://127.0.0.1:4000/api/series/");
      const data = await response.json();

      series = data;
    });
  } else {
    onMount(async () => {
      const response = await fetch(`http://127.0.0.1:4000/api/users/${id}`);
      const data = await response.json();

      data?.series_list.forEach(async (id) => {
        const response = await fetch(`http://127.0.0.1:4000/api/series/${id}`);
        const data = await response.json();

        series = [...series, data];
      });
    });
  }
</script>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mt-12 mb-12">
  <article>
    <h2 class="text-2xl font-extrabold text-gray-900">{title}</h2>
    <section class="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
      {#each series as serie}
        {#if !serie.is_deleted}
          <Card
            name={serie.name}
            description={serie.description}
            src={serie.poster}
            characters={serie.characters}
            id={serie.id}
          />
        {/if}
      {/each}
    </section>
  </article>
</section>
