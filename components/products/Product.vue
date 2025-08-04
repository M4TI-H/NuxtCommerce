<script setup lang="ts">
import type Product from '~/types/ProductType';
import Content from './Content.vue';
import Edit from './Edit.vue';

const { product } = defineProps<{
  product: Product
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
    <Content v-if="!isEditted" :product="product" @edit="switchDisplayMode" @refresh="emit('refresh')"/>
    <Edit v-if="isEditted" :product="product" @confirm="handleEdit" @cancel="switchDisplayMode"/>
  </div>
</template>