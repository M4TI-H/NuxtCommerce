<script setup lang="ts">
import type { ProductType } from '~/pages/products.vue';


const productData = ref<ProductType>({
  name: "",
  code: 0,
  isPublic: false,
  price: 0
});

const isEditted = ref<boolean>(false);
const switchDisplayMode = () => isEditted.value = !isEditted.value;

const handleEdit = () => {
  switchDisplayMode();
}

</script>

<template>
  <div class="w-64 h-96 p-4 flex flex-col items-center bg-neutral-800 rounded-2xl gap-8">
    <ProductData v-if="!isEditted" :productData="productData" @edit="switchDisplayMode"/>
    <ProductEdit v-if="isEditted" :productData="productData" @confirm="handleEdit" @cancel="switchDisplayMode"/>
  </div>
</template>