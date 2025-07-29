<script setup lang="ts">
import Menu from '~/components/Menu.vue';

definePageMeta({
  middleware: 'auth'
});

const { productsData, fetchUserProducts } = useFetchProducts();

const refreshProducts = () => {
  fetchUserProducts();
}

onMounted(refreshProducts);

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-8">
    <Menu />
    <div class="w-[90%] h-full flex flex-wrap gap-8">
      <ProductCreate @refresh="refreshProducts"/>
      <Product v-for="product in productsData" :product="product" @refresh="refreshProducts"/>
    </div>
  </div>
</template>