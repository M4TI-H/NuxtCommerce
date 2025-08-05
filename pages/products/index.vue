<script setup lang="ts">
import Menu from '~/components/Menu.vue';
import type Product from '~/types/ProductType';

definePageMeta({
  middleware: 'auth'
});

const { productsData, loading, fetchUserProducts } = useProduct();

const filter = ref<string>("date_of_creation");
const order = ref<number>(1);
const filteredProducts = ref<Product[]>([]);

const refreshProductsData = async () => {
  await fetchUserProducts(filter.value, order.value === 1);
  filteredProducts.value = productsData.value ?? [];
}

const updateSearchResults = (filtered: Product[]) => {
  filteredProducts.value = filtered;
}

onMounted(() => {
  refreshProductsData();
});

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center py-8 gap-8">
    <Menu />
    <div v-if="loading" class="absolute top-1/2">
      <i class="pi pi-spin pi-spinner text-white"></i>
    </div>

    <ProductsSearch :productsData="productsData ?? []"
      v-model:filter="filter"
      v-model:order="order"
      @refresh="refreshProductsData"
      @update:search="updateSearchResults"
    />

    <div v-if="!loading" class="w-[80%] flex flex-wrap justify-center gap-8">
      <ProductsItem v-for="product in productsData" :product="product" @refresh="refreshProductsData"/>
    </div>
  </div>
</template>