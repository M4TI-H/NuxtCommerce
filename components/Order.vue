<script setup lang="ts">
import type Order from '~/types/OrderType';

const { order } = defineProps<{
  order: Order
}>();

function formatDate(date: string): string {

  const formattedDate = new Date(date);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return formattedDate.toLocaleString("en-GB", dateOptions).replace(',', '');
}

const orderTableDisplay = ref<boolean>(false);

const showOrderTable = () => orderTableDisplay.value = !orderTableDisplay.value;

</script>

<template>
  <span class="w-full flex flex-col items-center">
    <div @click="showOrderTable"
      class="w-[60%] h-16 bg-emerald-600 rounded-2xl flex items-center justify-between p-4 
      hover:bg-emerald-700 hover:cursor-pointer"
    >
      <span class="flex gap-16">
        <p class="text-neutral-50 text-xl font-semibold">{{ order.order_title }}</p>
        <p class="text-neutral-50 text-xl font-semibold">{{ formatDate(order.order_date) }}</p>
        <p class="text-neutral-50 text-xl font-semibold">${{ order.total_price.toFixed(2) }}</p>
      </span>
        
      <i v-if="!orderTableDisplay" class="pi pi-angle-right"></i>
      <i v-if="orderTableDisplay" class="pi pi-angle-down"></i>
    </div>
    <div v-if="orderTableDisplay" class="w-[58%] h-100 bg-neutral-500 rounded-b-2xl">
    </div>
  </span>
</template>