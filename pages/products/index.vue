<script setup lang="ts">
import Menu from '~/components/Menu.vue';
import type Product from '~/types/ProductType';

definePageMeta({
  middleware: 'auth'
});

const { productsData, loading, fetchUserProducts, product, fetchOneProduct } = useProduct();

const filter = ref<string>("date_of_creation");
const order = ref<number>(1);
const filteredProducts = ref<Product[]>([]);
const displayHistory = ref<boolean>(false);

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

const handleShowHistory = async (product: Product) => {
  displayHistory.value = true;
  await fetchOneProduct(product.id);
}

</script>

<template>
  <div class="relative bg-neutral-700 w-screen min-h-screen flex flex-col items-center md:pt-8 pb-8 gap-8 overflow-y-auto z-0">
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

    <div v-if="!loading" class="w-[90%] flex flex-wrap justify-center gap-8">
      <ProductsItem v-for="product in productsData" :product="product" @refresh="refreshProductsData" @show-history="handleShowHistory"/>
    </div>
    <div v-if="displayHistory && !loading" class="fixed inset-0 flex items-center justify-center bg-black/70 z-10">
      <ProductsHistory v-if="product" :product="product" @close="displayHistory = false"/>
    </div>
  </div>
</template>