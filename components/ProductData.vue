<script setup lang="ts">
import type { ProductType } from '~/pages/products.vue';

const { productData } = defineProps<{
  productData: ProductType,
}>();

const emit = defineEmits(["edit"]);

const handleEdit = () => emit("edit");

</script>

<template>
  <span class="w-full flex items-center justify-between">
    <p class="text-neutral-100 text-3xl font-bold">{{ productData.name }}</p>
    <i v-if="!productData.isPublic" class="pi pi-lock" />
    <i v-if="productData.isPublic" class="pi pi-lock-open" />
  </span>

  <p class="text-neutral-100 text-4xl font-bold">{{ productData.price }}</p>
  <p class="text-neutral-400 text-md font-semibold">#{{ productData.code }}</p>

  <span class="w-full flex items-center justify-evenly">
    <Button @click="handleEdit" label="Edit" size="small" class="w-24" severity="info"/>
    <Button label="Delete" size="small" class="w-24" severity="danger"/>
  </span>

  <span class="w-full flex items-center justify-evenly">
    <IftaLabel>
      <InputNumber id="quantity" :inputStyle="{ width: '100px', height: '50px' }"/>
      <label for="quantity">Quantity</label>
    </IftaLabel>
    <Button label="Add" size="small" class="w-24"/>
  </span>
</template>