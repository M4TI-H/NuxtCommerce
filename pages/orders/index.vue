<script setup lang="ts">
import Menu from '~/components/Menu.vue';
import type Order from '~/types/OrderType';

definePageMeta({
  middleware: 'auth'
});

const { loading, ordersData, fetchOrders } = useOrder();

const filter = ref<string>("order_date");
const order = ref<number>(1);
const filteredOrders = ref<Order[]>([]);

const refreshOrdersData = async () => {
  await fetchOrders(filter.value, order.value === 1);
  filteredOrders.value = ordersData.value;
}

const updateSearchResults = (filtered: Order[]) => {
  filteredOrders.value = filtered;
}

onMounted(() => {
  refreshOrdersData();
});
</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-8 overflow-y-auto">
    <Menu />
    <div v-if="loading" class="absolute top-1/2">
      <i icon="pi pi-spin pi-spinner"></i>
    </div>

    <OrdersSearch :ordersData="ordersData" 
      v-model:filter="filter"
      v-model:order="order"
      @refresh="refreshOrdersData"
      @update:search="updateSearchResults"
    />
    <div v-if="!loading" class="w-full flex flex-col gap-8">
      <OrdersOrder v-for="order in filteredOrders" :order="order"/>
    </div>
  </div>
</template>