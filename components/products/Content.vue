<script setup lang="ts">
import type Product from '~/types/ProductType';

const { product } = defineProps<{
  product: Product,
}>();

const emit = defineEmits<{
 (e: "edit"): void,
 (e: "delete"): void,
 (e: "refresh"): void
}>();

const {  deleteProduct } = useProduct();

const handleDelete = async () => {
  await deleteProduct(product.id);
  emit("refresh");
}

</script>

<template>
  <div class="w-full flex items-center justify-between">
    <div>
      <p class="text-neutral-100 text-xl font-bold">{{ product.name }}</p>
      <p class="text-neutral-400 text-md font-semibold">#{{ product.code }}</p>
    </div>
    <i v-if="!product.isPublic" class="pi pi-lock" />
    <i v-if="product.isPublic" class="pi pi-lock-open" />
  </div>

  <p class="text-neutral-100 text-3xl font-bold">${{ product.price }}</p>
  <p class="text-neutral-400 text-md font-semibold">Available items: {{ product.availability }}</p>

  <div class="w-full flex items-center justify-evenly mt-auto">
    <Button @click="emit('edit')" label="Edit" class="w-20 h-8" severity="info"/>
    <Button @click="handleDelete" label="Delete"class="w-20 h-8" severity="danger"/>
  </div>
</template>