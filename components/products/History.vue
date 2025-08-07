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
  <div class="relative w-[32rem] h-[36rem] bg-neutral-800 rounded-xl flex flex-col p-4 gap-4">
    <i @click="emit('close')" class="pi pi-times absolute right-6 top-6 hover:cursor-pointer"></i>
    <div>
      <p class="text-neutral-100 text-2xl font-bold">{{ product.name }}</p>
      <p class="text-neutral-400 text-md font-semibold">#{{ product.code }}</p>
      <span class="flex items-center gap-2">
        <p class="text-neutral-400 text-sm font-semibold">Available items: {{ product.availability > 0 ? product.availability : "" }}</p>
        <p v-if="product.availability === 0" class="text-red-500 text-sm font-semibold">Out of stock</p>
      </span>
    </div>
    <DataTable :value="productHistory" dataKey="id" scrollable class="max-h-[28rem] overflow-auto">
      <Column header="Order date">
        <template #body="slot">
          {{ slot.data.orders.order_date.slice(0, 10) }}
        </template>
      </Column>
      <Column field="quantity" header="Quantity"></Column>
      <Column header="Price at order">
        <template #body="slot">
          ${{ slot.data.price_at_order }}
        </template>
      </Column>
      <Column header="Total">
        <template #body="slot">
          ${{ slot.data.quantity * slot.data.price_at_order }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>