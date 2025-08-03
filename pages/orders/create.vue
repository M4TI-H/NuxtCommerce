<script setup lang="ts">
import Menu from '~/components/Menu.vue';

definePageMeta({
  middleware: 'auth'
});

const { totalOrder, loading, createOrder, updateTotalOrder } = useCreateOrder();
const { publicProductsData, fetchPublicProducts } = useProduct();
onMounted(async () => await fetchPublicProducts());

const selectedNewProduct = ref<number | null>(null);
const isProductSelected = ref<boolean>(false);
const productsID = ref<number[]>([]);
const filledInputs = ref<boolean>(false);
const orderTitle = ref<string>("");

// data computed for product select input
const options = computed(() =>
  publicProductsData.value
  ?.filter(product => !productsID.value.includes(product.id))
  .map(product => ({
    label: product.name,
    value: product.id
  })) || []
);

watch(selectedNewProduct, (newValue) => {
  isProductSelected.value = newValue !== null;
});

// handleAddToOrder - pass product ID to display its content
const handleAddToOrder = () => {
  if (selectedNewProduct.value) {
    productsID.value.push(selectedNewProduct.value);
  }
}

// handle removal from order list
const removeFromTotalOrder = (itemToRemove: number) => {
  productsID.value = productsID.value?.filter(id => id !== itemToRemove);
  totalOrder.value = totalOrder.value?.filter(product => product.product_id !== itemToRemove);
}

// all total prices of products summarized
const totalSum = computed(() => {
  return totalOrder.value.reduce((sum, item) => sum + item.total, 0);  
});

// watch whether all inputs are correctly filled
watchEffect(() => {
  if (orderTitle.value && totalSum.value > 0) filledInputs.value = true;
  else filledInputs.value = false;
})

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-8">
    <Menu />
    <div class="w-[50vw] h-[80vh] p-4 flex flex-col items-center gap-8 bg-neutral-500 rounded-2xl">
      <p class="text-neutral-100 text-2xl font-semibold">New order</p>
      <div class="w-full max-h-[45vh] flex flex-col items-center"> 
        <OrderProduct v-for="product in productsID" :productID="product"
          @update-item="updateTotalOrder" @remove-item="removeFromTotalOrder"
        />
      </div>

      <span class="flex gap-8">
        <Select v-model="selectedNewProduct" :options="options" 
          option-label="label" option-value="value" 
          placeholder="Select product" class="w-64"
        />
        <Button @click="handleAddToOrder" label="Add to your order" icon="pi pi-plus-circle" :disabled="!isProductSelected || options.length === 0"/>
      </span>
      <span class="w-full h-24 flex flex-col gap-4 items-end mt-auto">
        <p class="text-neutral-100 text-xl font-semibold">Order total: ${{ totalSum.toFixed(2) }}</p>
        <span class="flex gap-8">
          <InputText v-model="orderTitle" placeholder="Order title" />
          <Button v-if="!loading" @click="createOrder(orderTitle, totalSum)" label="Order" class="w-32" :disabled="!filledInputs"/>
          <Button v-else icon="pi pi-spin pi-spinner" class="w-32"/>
        </span>
      </span>
    </div>
  </div> 
</template>