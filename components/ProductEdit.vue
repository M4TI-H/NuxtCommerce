<script setup lang="ts">
import type Product from '~/types/ProductType';

const { product } = defineProps<{
  product: Product,
}>();

const { editProduct } = useProduct();

const newData = ref<Product>({
  id: product.id,
  name: product.name,
  price: product.price,
  code: product.code,
  isPublic: product.isPublic,
  user_id: product.user_id
});

const emit = defineEmits<{
  (e: "confirm"): void, 
  (e: "cancel"): void,
}>();

const handleEdit = () => {
  editProduct(newData.value, product.id);
  emit("confirm");
}

</script>

<template>
  <IftaLabel class="mt-4">
    <InputText id="name" v-model="newData.name" class="h-12"/>
    <label for="name">Product name</label>
  </IftaLabel>
  <IftaLabel>
    <InputNumber id="price" v-model="newData.price" class="h-12"
      :minFractionDigits="0" :maxFractionDigits="2"/>
    <label for="price">Price</label>
  </IftaLabel>
  <IftaLabel>
    <InputText id="code" v-model="newData.code" class="h-12"/>
    <label for="code">Code</label>
  </IftaLabel>

  <span class="w-[90%] flex items-center justify-between">
    <p class="text-neutral-100 text-md">Set visibility to</p>
    <Button
      @click="newData.isPublic = !newData.isPublic"
      :icon="newData.isPublic ? 'pi pi-lock-open' : 'pi pi-lock'"
      :label="newData.isPublic ? 'Public' : 'Private'"
      class="w-22 h-10"
    />
  </span>
  <span class="w-full flex items-center justify-evenly mt-auto">
    <Button @click="emit('cancel')" label="Cancel" class="w-20 h-8"/>
    <Button @click="handleEdit" label="Confirm" class="w-20 h-8"/>
  </span>
</template>