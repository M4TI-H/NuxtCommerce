<script setup lang="ts">
import type { ProductType } from '~/pages/products.vue';

const { productData } = defineProps<{
  productData: ProductType,
}>();

const name = ref<string>(productData.name);
const price = ref<number>(productData.price);
const isPublic = ref<boolean>(productData.isPublic);

const emit = defineEmits(["confirm", "cancel"]);

const handleConfirm = () => emit("confirm");
const handleCancel = () => emit("cancel");

</script>

<template>
  <IftaLabel class="mt-4">
    <InputText id="name" v-model="name"/>
    <label for="name">Product name</label>
  </IftaLabel>
  <IftaLabel>
    <InputNumber id="price" v-model="price"/>
    <label for="price">Price</label>
  </IftaLabel>
  
  <span class="w-[90%] flex items-center justify-between">
    <p class="text-neutral-100 text-md">Set visibility to</p>
    <Button
      @click="isPublic = !isPublic"
      :icon="isPublic ? 'pi pi-lock-open' : 'pi pi-lock'"
      :label="isPublic ? 'Public' : 'Private'"
      size="small" class="w-20"
    />
  </span>
  <span class="w-full flex items-center justify-evenly mt-auto">
    <Button @click="handleCancel" label="Cancel" />
    <Button @click="handleConfirm" label="Confirm"/>
  </span>
</template>