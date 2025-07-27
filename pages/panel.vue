<script setup lang="ts">
import Menu from '~/components/Menu.vue';

definePageMeta({
  middleware: () => {
    const user = useSupabaseUser();
    if (!user.value) {
      return navigateTo("/");
    }
  }
});

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-32">
    <Menu />
    <span class="flex gap-32">
      <div @click="navigateTo('/products')"
        class="w-64 h-64 bg-emerald-600 rounded-2xl flex flex-col justify-center items-center gap-8
        hover:bg-emerald-700 cursor-pointer">
        <i class="pi pi-warehouse" style="font-size: 50px"></i>
        <p class="text-neutral-50 text-2xl font-semibold">Products list</p>
      </div>
      <div @click="navigateTo('/orders')"
        class="w-64 h-64 bg-emerald-600 rounded-2xl flex flex-col justify-center items-center gap-8
        hover:bg-emerald-700 cursor-pointer">
        <i class="pi pi-list" style="font-size: 50px"></i>
        <p class="text-neutral-50 text-2xl font-semibold">Your order</p>
      </div>
    </span>
  </div>
</template>