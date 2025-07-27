<script setup lang="ts">
import type { ProductType } from '~/pages/products.vue';

const { product } = defineProps<{
  product: ProductType
}>();


const isEditted = ref<boolean>(false);
const switchDisplayMode = () => isEditted.value = !isEditted.value;

const handleEdit = () => {
  switchDisplayMode();
}

</script>

<template>
  <div class="w-64 h-96 p-4 flex flex-col items-center bg-neutral-800 rounded-2xl gap-12">
    <ProductData v-if="!isEditted" :product="product" @edit="switchDisplayMode"/>
    <ProductEdit v-if="isEditted" :product="product" @confirm="handleEdit" @cancel="switchDisplayMode"/>
  </div>
</template>