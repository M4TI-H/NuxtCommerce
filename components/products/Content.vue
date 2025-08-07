<script setup lang="ts">
import type Product from '~/types/ProductType';

const { product } = defineProps<{
  product: Product,
}>();

const emit = defineEmits<{
 (e: "edit"): void,
 (e: "delete"): void,
 (e: "refresh"): void,
 (e: "show-history", payload: Product): void
}>();

const {  deleteProduct } = useProduct();

const handleDelete = async () => {
  await deleteProduct(product.id);
  emit("refresh");
}

</script>

<template>
  <div class="relative w-full flex items-center justify-between">
    <div>
      <p class="text-neutral-100 text-2xl font-bold">{{ product.name }}</p>
      <p class="text-neutral-400 text-md font-semibold">#{{ product.code }}</p>
      <span class="flex items-center gap-2">
        <p class="text-neutral-400 text-sm font-semibold">Available items: {{ product.availability > 0 ? product.availability : "" }}</p>
        <p v-if="product.availability === 0" class="text-red-500 text-sm font-semibold">Out of stock</p>
      </span>
    </div>
    <i v-if="!product.isPublic" class="pi pi-lock" style="font-size: 1.5rem"/>
    <i v-if="product.isPublic" class="pi pi-lock-open" style="font-size: 1.5rem"/>
  </div>
  
  <div class="w-full h-full flex flex-col items-end justify-end gap-4">
    <p class="text-neutral-100 text-4xl font-bold">${{ product.price }}</p>
    <div class="w-full flex items-center justify-end gap-4">
      <Button @click="handleDelete" label="Delete"class="w-20 h-8" severity="danger"/>
      <Button @click="emit('edit')" label="Update" class="w-20 h-8" severity="info"/>
      <Button @click="emit('show-history', product)" label="Order history" class="w-40 h-8"/>
    </div>
  </div>
</template>