<script>
  import ProfileCard from "@/components/ProfileCard.svelte";
  import Categories from "@/components/Categories.svelte";
  import Series from "@/components/Series.svelte";
  import { fade } from "svelte/transition";

  import Router from "svelte-routing/Router.svelte";
  import Route from "svelte-routing/Route.svelte";
  import Link from "svelte-routing/Link.svelte";

  if (window.location.pathname === "/") {
    window.location.pathname = "/series";
  }
</script>

<main transition:fade>
  <Router url={""}>
    <nav>
      <ul class="flex">
        <Link to="perfil/6166f70ceda1ed96af877173">
          <li class="ml-2">perfil</li>
        </Link>

        <Link to="categories">
          <li class="ml-2">categories</li>
        </Link>

        <Link to="series">
          <li class="ml-2">series</li>
        </Link>
      </ul>
    </nav>

    <Route path="perfil/:id" let:params>
      <ProfileCard userId={params.id} />
      <Series title={"favorites"} id={params.id} />
    </Route>

    <Route path="categories">
      <Categories />
    </Route>

    <Route path="series">
      <Series custom={true} />
    </Route>
  </Router>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
