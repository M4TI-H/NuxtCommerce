<script setup lang="ts">
import Menu from '~/components/Menu.vue';
import type Order from '~/types/OrderType';
const supabase = useSupabaseClient();

definePageMeta({
  middleware: 'auth'
});

const ordersData = ref<Order[]>([]);

async function fetchOrders() {
  const { data, error } = await supabase
  .from("orders")
  .select("*")
  .order("order_date", { ascending: false })

  if (error) {
    console.error(error);
    return;
  }

  ordersData.value = data;
}

onMounted(fetchOrders);
</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-8">
    <Menu />
    <div @click="navigateTo('/orders/create')"
      class="w-48 h-48 bg-emerald-600 rounded-2xl flex flex-col justify-center items-center gap-8
      hover:bg-emerald-700 cursor-pointer">
      <i class="pi pi-cart-plus" style="font-size: 40px"></i>
      <p class="text-neutral-50 text-xl font-semibold">Create new order</p>
    </div>
    <Order v-for="order in ordersData" :order="order"/>
  </div>
</template>