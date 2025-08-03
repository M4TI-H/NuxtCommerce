<script setup lang="ts">
import type Product from '~/types/ProductType';

const newProductData = ref<Product>({
  id: 0,
  name: "",
  code: "",
  isPublic: false,
  price: 0,
  user_id: ""
});

const emit = defineEmits<{
  (e: "refresh"): void
}>();

const { addNewProduct } = useProduct();

const handleCreateProduct = () => {
  addNewProduct(newProductData.value);

  newProductData.value = {
    id: 0,
    name: "",
    code: "",
    isPublic: false,
    price: 0,
    user_id: ""
  };

  emit("refresh");
}

</script>

<template>
  <div class="w-64 h-96 p-4 pb-8 flex flex-col items-center gap-4 bg-neutral-800 rounded-2xl"> 
    <p class="text-neutral-100 text-2xl font-semibold">Add new product</p>
      <IftaLabel>
      <InputText id="name" v-model="newProductData.name" class="h-12"/>
      <label for="name">Product name</label>
    </IftaLabel>
    <IftaLabel>
      <InputNumber id="price" v-model="newProductData.price" class="h-12"
        :minFractionDigits="0" :maxFractionDigits="2"/>
      <label for="price">Price</label>
    </IftaLabel>
    <IftaLabel>
      <InputText id="code" v-model="newProductData.code" class="h-12"/>
      <label for="code">Code</label>
    </IftaLabel>
    <span class="w-full flex items-center justify-evenly">
      <p class="text-neutral-100 text-md">Set visibility to</p>
        <Button
        @click="newProductData.isPublic = !newProductData.isPublic"
        :icon="newProductData.isPublic ? 'pi pi-lock-open' : 'pi pi-lock'"
        :label="newProductData.isPublic ? 'Public' : 'Private'"
        size="small" class="w-20"
      />
    </span>
    <Button @click="handleCreateProduct" label="Submit" class="mt-auto"/>
  </div>
</template>