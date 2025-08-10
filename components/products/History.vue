<script setup lang="ts">
import type Product from '~/types/ProductType';

const { product } = defineProps<{
  product: Product
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { productHistory, fetchProductHistory } = useProduct();

onMounted(async () => {
  await fetchProductHistory(product.id);
});

</script>

<template>
  <div class="relative max-w-[90%] xl:max-w-[36rem] w-full max-h-[90%] xl:max-h-[36rem] h-full bg-neutral-800 rounded-xl flex flex-col p-4 gap-4">
    <p class="text-center font-semibold text-xl text-neutral-100">Order history</p>
    <i @click="emit('close')" class="pi pi-times absolute right-6 top-6 hover:cursor-pointer"></i>
    <div class="flex gap-4">
      <div class="bg-neutral-600 h-full w-[6rem] md:max-w-[10rem] md:w-full"></div>
      <div>
        <p class="text-neutral-100 md:text-2xl font-bold">{{ product.name }}</p>
        <p class="text-neutral-400 text-xs md:text-md font-semibold">#{{ product.code }}</p>
        <span class="flex items-center gap-2">
          <p class="text-neutral-400 text-xs md:text-md font-semibold">Available items: {{ product.availability > 0 ? product.availability : "" }}</p>
          <p v-if="product.availability === 0" class="text-red-500 text-sm font-semibold">Out of stock</p>
        </span>
      </div>
    </div>
    <DataTable :value="productHistory" dataKey="id" scrollable class="max-h-[90%] overflow-auto">
      <Column header="Order date">
        <template #body="slot">
          <p class="w-[6rem]">{{ slot.data.orders.order_date.slice(0, 10) }}</p>
        </template>
      </Column>
      <Column field="quantity" header="Quantity"></Column>
      <Column header="Price at order">
        <template #body="slot">
          <p class="w-[8rem]">${{ slot.data.price_at_order }}</p>
        </template>
      </Column>
      <Column header="Total">
        <template #body="slot">
           <p class="w-[6rem]">${{ slot.data.quantity * slot.data.price_at_order }}</p>
        </template>
      </Column>
    </DataTable>
  </div>
</template>