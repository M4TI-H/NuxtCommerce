<script setup lang="ts">
import Menu from '~/components/Menu.vue';

definePageMeta({
  middleware: () => {
    const user = useSupabaseUser();
    if (!user.value) {
      return navigateTo("/");
    }
  }
});

const selectedNewProduct = ref<number>();
const isProductSelected = ref<boolean>(false);

const options = [
  'product 1',
  'product 2',
  'product 3',
];

const handleSelectProduct = () => {
  if (!isProductSelected.value) {
    isProductSelected.value = true;
  }
}

const handleAddToOrder = () => {
  console.log("Added product");
}

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-8">
    <Menu />
    <div class="w-[50vw] h-[80vh] p-4 flex flex-col items-center gap-8 bg-neutral-500 rounded-2xl">
      <p class="text-neutral-100 text-2xl font-semibold">New order</p>
      <div class="w-full flex flex-col items-center"> 
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
      </div>

      <span class="flex gap-8">
        <Select @change="handleSelectProduct" :options="options" v-model="selectedNewProduct" placeholder="Select product" class="w-64"/>
        <Button @click="handleAddToOrder" label="Add to your order" icon="pi pi-plus-circle" :disabled="!isProductSelected"/>
      </span>
      <span class="w-full h-24 flex flex-col gap-4 items-end mt-auto">
        <p class="text-neutral-100 text-3xl font-semibold">Order total: $0.00</p>
        <span class="flex gap-8">
          <InputText placeholder="Order title" />
          <Button label="Order" class="w-32"/>
        </span>
      </span>
    </div>
  </div> 
</template>