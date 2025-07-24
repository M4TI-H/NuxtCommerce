<script setup lang="ts">
import { Button } from 'primevue';

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center justify-center gap-16">
    <p class="text-neutral-100 text-4xl font-semibold">Welcome to NuxtCommerce!</p>
    <div class="w-64 flex justify-between">
      <Button as="a" href="/login"
        icon="pi pi-user" label="Login"  raised/>
      <Button as="a" href="/register"
        icon="pi pi-user-plus" label="Register" raised/>
    </div>
  </div>
</template>