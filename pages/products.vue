<script setup lang="ts">
import Menu from '~/components/Menu.vue';

definePageMeta({
  middleware: 'auth'
});

const { productsData, fetchProducts } = useFetchProducts();
onMounted(fetchProducts);

provide("refreshProducts", fetchProducts);

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-8">
    <Menu />
    <div class="w-[90%] h-full flex flex-wrap gap-8">
      <ProductCreate @refresh="fetchProducts"/>
      <Product v-for="product in productsData" :product="product" @refresh="fetchProducts"/>
    </div>
  </div>
</template>