<script setup lang="ts">
import type ProductType from '~/types/ProductType';

const { product } = defineProps<{
  product: ProductType
}>();

const { fetchProducts } = useFetchProducts();

const isEditted = ref<boolean>(false);
const switchDisplayMode = () => isEditted.value = !isEditted.value;

const handleEdit = () => {
  switchDisplayMode();
  fetchProducts();
}

</script>

<template>
  <div class="w-64 h-96 p-4 flex flex-col items-center bg-neutral-800 rounded-2xl gap-4">
    <ProductData v-if="!isEditted" :product="product" @edit="switchDisplayMode"/>
    <ProductEdit v-if="isEditted" :product="product" @confirm="handleEdit" @cancel="switchDisplayMode"/>
  </div>
</template>