<script setup lang="ts">
import type Product from '~/types/ProductType';

const emit = defineEmits<{
  (e: "refresh"): void,
  (e: "update:filter", value: string): void,
  (e: "update:order", value: number): void,
  (e: "update:search", filtered: Product[]): void
}>();

const { productsData } = defineProps<{
  productsData: Product[],
  filter: string,
  order: number
}>();

const search = ref<string>("");

const filterOptions = [
  {label: 'Creation date', value: 'date_of_creation'},
  {label: 'Alphabetic', value: 'name'},
  {label: 'Availability', value: 'availability'},
];

const filterProductsOptions = [
  {label: "ASC", value: 1},
  {label: "DESC", value: 0},
];

const searchProducts = () => {
  const input = search.value.trim().toLowerCase();

  if (!input) {
    emit("update:search", productsData);
    return;
  }

  const filtered = productsData.filter(item => 
    item.name.toLowerCase().includes(input) ||
    item.code.toLowerCase().includes(input)
  );

  emit("update:search", filtered);
}

watch(search, () => {
  searchProducts();
});

</script>

<template>
  <div class="w-full md:w-[95%] lg:w-[80%] h-auto md:h-12 flex flex-col md:flex-row items-center justify-between gap-4">
    <div class="w-full md:w-[30%] lg:w-[30%] flex justify-center">
      <Button icon="pi pi-plus" label="Add new product" size="medium" raised
        @click="navigateTo('products/create')" class="w-full max-w-[16rem]"
      />
    </div>
    <div class="w-[90%] md:w-[50%] h-12 md:h-12 flex items-center justify-center">
      <InputGroup class="max-w-[20rem] xl:max-w-[30rem]">
        <InputGroupAddon >
          <i class="pi pi-search"></i>
        </InputGroupAddon>
        <InputText v-model="search" class="h-12 font-semibold" placeholder="Search products"/>
      </InputGroup>
    </div>
    <div class="w-full md:w-[30%] max-w-[95%] xl:max-w-[20rem] flex md:flex-col xl:flex-row items-end justify-center md:justify-end gap-2">
      <Select @change="emit('refresh')" :options="filterOptions"
        :modelValue="filter" @update:modelValue="value => emit('update:filter', value)"
        option-label="label" option-value="value" 
        class="w-full"
      />
      <SelectButton @change="emit('refresh')" :options="filterProductsOptions" 
        :modelValue="order" @update:modelValue="value => emit('update:order', value)"
        option-label="label" option-value="value"
      />
    </div>
  </div>
</template>