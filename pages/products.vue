<script setup lang="ts">
import Menu from '~/components/Menu.vue';

definePageMeta({
  middleware: 'auth'
});

const { productsData, loading, fetchUserProducts } = useProduct();

const refreshProductsData = async () => {
  await fetchUserProducts();
}

onMounted(refreshProductsData);

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-8">
    <Menu />
    <div v-if="loading" class="absolute top-1/2">
      <i class="pi pi-spin pi-spinner text-white"></i>
    </div>
    <div v-else class="w-[90%] h-full flex flex-wrap gap-8">
      <ProductCreate @refresh="refreshProductsData"/>
      <Product v-for="product in productsData" :product="product" @refresh="refreshProductsData"/>
    </div>
  </div>
</template>