<script>
  import { onMount } from "svelte";

  export let userId = "";

  let userData = {};

  onMount(async () => {
    const response = await fetch(`http://127.0.0.1:4000/api/users/${userId}`);
    const data = await response.json();

    userData = data;
  });
</script>

<div
  class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-md md:max-w-2xl "
>
  <div class="flex items-start px-4 py-2">
    <div class="">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">
          {userData?.name}
        </h2>
        <small class="text-sm text-gray-700 ml-6">{userData?.location}</small>
      </div>
      <p class="mt-3 text-gray-700">
        {userData?.email}
      </p>
      <div class="mt-4 flex items-center">
        <div class="flex mr-2 text-gray-700 text-sm mr-3">
          <span>language: {userData?.language}</span>
        </div>
        <div class="flex mr-2 text-gray-700 text-sm mr-8">
          <span>time zone: {userData?.time_zone}</span>
        </div>
      </div>
    </div>
  </div>
</div>
