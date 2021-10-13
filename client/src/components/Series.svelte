<script>
  import SeriesCard from "./SeriesCard.svelte";

  export let title;
  export let custom;
  export let series = [];
  export let id;

  const props = { title, custom, series, id };
</script>

<SeriesCard {...props} />
