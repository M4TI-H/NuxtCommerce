<script setup lang="ts">
import type ProductType from '~/types/ProductType';

const { product } = defineProps<{
  product: ProductType
}>();

const emit = defineEmits<{
  (e: "refresh"): void
}>();

const isEditted = ref<boolean>(false);
const switchDisplayMode = () => isEditted.value = !isEditted.value;

const handleEdit = () => {
  switchDisplayMode();
  emit("refresh");
}

</script>

<template>
  <div class="w-64 h-96 p-4 flex flex-col items-center bg-neutral-800 rounded-2xl gap-4">
    <ProductData v-if="!isEditted" :product="product" @edit="switchDisplayMode" @delete="emit('refresh')"/>
    <ProductEdit v-if="isEditted" :product="product" @confirm="handleEdit" @cancel="switchDisplayMode"/>
  </div>
</template>