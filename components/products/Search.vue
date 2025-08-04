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
        <InputText v-model="search" class="h-12 font-semibold" placeholder="Search products"/>
      </InputGroup>
    </div>
    <div class="w-[30%] flex gap-2 justify-end">
      <Select @change="emit('refresh')" :options="filterOptions"
        :modelValue="filter" @update:modelValue="value => emit('update:filter', value)"
        option-label="label" option-value="value" 
        class="w-44"
      />
      <SelectButton @change="emit('refresh')" :options="filterProductsOptions" 
        :modelValue="order" @update:modelValue="value => emit('update:order', value)"
        option-label="label" option-value="value"
      />
    </div>
  </div>
</div>
</template>