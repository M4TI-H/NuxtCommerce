<script setup lang="ts">
import type { ProductType } from '~/pages/products.vue';
import { inject } from 'vue';

const { product } = defineProps<{
  product: ProductType,
}>();

const emit = defineEmits(["edit"]);

const handleEdit = () => emit("edit");

</script>

<template>
  <span class="w-full flex items-center justify-between">
    <span>
      <p class="text-neutral-100 text-3xl font-bold">{{ product.name }}</p>
      <p class="text-neutral-400 text-md font-semibold">#{{ product.code }}</p>
    </span>
    <i v-if="!product.isPublic" class="pi pi-lock" />
    <i v-if="product.isPublic" class="pi pi-lock-open" />
  </span>

  <p class="text-neutral-100 text-5xl font-bold">${{ product.price }}</p>

  <span class="w-full flex items-center justify-evenly mt-auto">
    <Button @click="handleEdit" label="Edit" size="small" class="w-24" severity="info"/>
    <Button label="Delete" size="small" class="w-24" severity="danger"/>
  </span>
</template>