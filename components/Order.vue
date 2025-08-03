<script setup lang="ts">
import type Order from '~/types/OrderType';

const { order } = defineProps<{
  order: Order
}>();

const { formatDate } = useFormatDate();
const { orderDetails, fetchOrderDetails } = useOrder();

onMounted(() => fetchOrderDetails(order.id));

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
    <div v-if="orderTableDisplay" class="w-[58%] bg-neutral-500 rounded-b-2xl">
      <DataTable :value="orderDetails" dataKey="id">
        <Column field="products.code" header="Code"></Column>
        <Column field="products.name" header="Name"></Column>
        <Column field="price_at_order" header="Price ($)">
          <template #body="slot">
            ${{ slot.data.price_at_order.toFixed(2) }}
          </template>
        </Column>
        <Column field="quantity" header="Quantity"></Column>
        <Column header="Total ($)">
          <template #body="slot">
            ${{ (slot.data.quantity * slot.data.price_at_order).toFixed(2) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </span>
</template>