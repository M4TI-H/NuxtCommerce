<script setup lang="ts">

function handleLogout() {
  navigateTo("/");
}

</script>

<template>
  <div class="w-[90%] h-16 bg-emerald-600 rounded-2xl
    flex items-center justify-between p-4">
    <p class="text-neutral-100 text-xl font-semibold">Logged as: </p>
    <a class="text-neutral-100 text-2xl font-semibold decoration-none" href="/panel">Nuxt Commerce</a>
    <Button @click="handleLogout" label="Log out"/>
  </div>
</template>