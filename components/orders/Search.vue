<script setup lang="ts">
import type Order from '~/types/OrderType';

const emit = defineEmits<{
  (e: "refresh"): void,
  (e: "update:filter", value: string): void,
  (e: "update:order", value: number): void,
  (e: "update:search", filtered: Order[]): void
}>();

const { ordersData } = defineProps<{
  ordersData: Order[],
  filter: string,
  order: number
}>();

const search = ref<string>("");

const filterOptions = [
  {label: 'Order date', value: 'order_date'},
  {label: 'Alphabetic', value: 'name'},
  {label: 'Total price', value: 'total_price'},
];

const filterOrderOptions = [
  {label: "ASC", value: 1},
  {label: "DESC", value: 0},
];

const searchOrders = () => {
  const input = search.value.trim().toLowerCase();

  if (!input) {
    emit("update:search", ordersData);
    return;
  }

  const filtered = ordersData.filter(item => 
    item.order_title.toLowerCase().includes(input)
  );

  emit("update:search", filtered);
}

watch(search, () => {
  searchOrders();
});

</script>

<template>
<div class="w-full flex flex-col items-center gap-8">
  <div class="w-[80%] h-12 flex items-center justify-between">
    <div class="w-[30%]">
      <Button icon="pi pi-plus" label="Place new order" 
        size="medium" raised class="w-44" @click="navigateTo('orders/create')"/>
    </div>
    <div class="w-[30%] flex">
      <InputGroup>
        <InputGroupAddon >
          <i class="pi pi-search"></i>
        </InputGroupAddon>
        <InputText v-model="search" class="h-12 font-semibold" placeholder="Search orders"/>
      </InputGroup>
    </div>
    <div class="w-[30%] flex gap-2 justify-end">
      <Select @change="emit('refresh')" :options="filterOptions"
        :modelValue="filter" @update:modelValue="value => emit('update:filter', value)"
        option-label="label" option-value="value" 
        class="w-44"
      />
      <SelectButton @change="emit('refresh')" :options="filterOrderOptions" 
        :modelValue="order" @update:modelValue="value => emit('update:order', value)"
        option-label="label" option-value="value"
      />
    </div>
  </div>
</div>
</template>