<script setup lang="ts">

definePageMeta({
  middleware: () => {
    const user = useSupabaseUser();
    if (user.value) {
      return navigateTo('/panel');
    }
  }
});


</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex items-center justify-center">
    <div class="w-[30vw] h-[30vh] bg-neutral-800 flex flex-col items-center justify-center gap-16 rounded-3xl shadow-xl">
      <p class="text-neutral-100 text-4xl font-semibold">Welcome to NuxtCommerce!</p>
      <div class="w-64 flex justify-between">
        <NuxtLink to="/login">
          <Button icon="pi pi-user" label="Login" class="w-24" raised/>
        </NuxtLink>
        <NuxtLink to="/register">
          <Button icon="pi pi-user-plus" label="Register" class="w-24" raised/>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>