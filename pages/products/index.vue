<script setup lang="ts">
import Menu from '~/components/Menu.vue';
import type Product from '~/types/ProductType';

definePageMeta({
  middleware: 'auth'
});

const { productsData, loading, fetchUserProducts } = useProduct();

const filterOptions = [
  {label: 'Creation date', value: 'date_of_creation'},
  {label: 'Alphabetic', value: 'name'},
  {label: 'Availability', value: 'availability'},
];

const filterOrderOptions = [
  {label: "ASC", value: 1},
  {label: "DESC", value: 0},
];

const filter = ref<string>("date_of_creation");
const order = ref<number>(1);
const productsDataCopy = ref<Product[]>([]);
const search = ref<string>("");

const changeFilter = () => {
  refreshProductsData();
}

const refreshProductsData = async () => {
  await fetchUserProducts(filter.value, order.value === 1);
  productsDataCopy.value = [...(productsData.value || [])];
}

const searchProducts = () => {
  const input = search.value.trim().toLowerCase();

  if (!input) {
    productsData.value = [...productsDataCopy.value];
    return;
  }

  const filtered = productsDataCopy.value?.filter(item => 
    item.name.toLowerCase().includes(input) ||
    item.code.toLowerCase().includes(input)
  );

  productsData.value = filtered;
}

onMounted(() => {
  refreshProductsData();
  changeFilter();
});

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-4">
    <Menu />
    <div v-if="loading" class="absolute top-1/2">
      <i class="pi pi-spin pi-spinner text-white"></i>
    </div>

    <div class="w-full flex flex-col items-center gap-8">
      <div class="w-[80%] h-12 flex items-center justify-between">
        <div class="w-[30%]">
          <Button icon="pi pi-plus" label="Add new product" 
            size="medium" raised class="w-44"
            @click="navigateTo('products/create')"/>
        </div>
        <div class="w-[30%] flex">
          <InputGroup>
            <InputGroupAddon >
              <i class="pi pi-search"></i>
            </InputGroupAddon>
            <InputText v-model="search" @value-change="searchProducts"
              class="h-12 font-semibold" placeholder="Search your products"/>
          </InputGroup>
        </div>
        <div class="w-[30%] flex gap-2 justify-end">
          <Select @change="changeFilter" v-model="filter"
            :options="filterOptions"
            option-label="label" option-value="value" 
            class="w-44"
          />
          <SelectButton @change="changeFilter" v-model="order"
            :options="filterOrderOptions" option-label="label" 
            option-value="value"/>
        </div>
      </div>
      <div v-if="!loading" class="w-[70%] h-full flex flex-wrap gap-8">
        <Product v-for="product in productsData" :product="product" @refresh="refreshProductsData"/>
      </div>
    </div>
  </div>
</template>