<script setup lang="ts">
import Menu from '~/components/Menu.vue';

definePageMeta({
  middleware: 'auth'
});

const { loading, ordersData, fetchOrders } = useOrder();

onMounted(fetchOrders);
</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-8 overflow-y-auto">
    <Menu />
    <div v-if="loading" class="absolute top-1/2">
      <i icon="pi pi-spin pi-spinner"></i>
    </div>
    <div v-else @click="navigateTo('/orders/create')"
      class="size-40 bg-emerald-600 rounded-2xl flex flex-col justify-center items-center gap-8
      hover:bg-emerald-700 cursor-pointer">
      <i class="pi pi-cart-plus" style="font-size: 40px"></i>
      <p class="text-neutral-50 text-md font-semibold">Create new order</p>
    </div>
    <Order v-for="order in ordersData" :order="order"/>
  </div>
</template>