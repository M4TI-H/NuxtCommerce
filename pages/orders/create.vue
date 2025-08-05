<script setup lang="ts">
import Menu from '~/components/Menu.vue';
import type OrderItem from '~/types/OrderItemType';
import type Product from '~/types/ProductType';

definePageMeta({
  middleware: 'auth'
});

const { totalOrder, loading, createOrder, updateTotalOrder } = useOrder();
const { publicProductsData, fetchPublicProducts, product, fetchOneProduct } = useProduct();

onMounted(async () => await fetchPublicProducts());

const allProducts = ref<Product[]>([]);
const selectedNewProduct = ref<number | null>(null);
const isProductSelected = ref<boolean>(false);
const filledInputs = ref<boolean>(false);
const orderTitle = ref<string>("");

// data computed for product select input
const options = computed(() =>
  publicProductsData.value
  ?.filter(product => !allProducts.value.some(p => p.id === product.id))
  .map(product => ({
    label: `${product.name} | #${product.code}`,
    value: product.id,
    disabled: product.availability === 0
  })) || []
);

// check whether product is selected to enable button
watch(selectedNewProduct, (newValue) => {
  isProductSelected.value = newValue !== null;
});

// add product to order
const handleAddToOrder = async () => {
  if (selectedNewProduct.value) {
    await fetchOneProduct(selectedNewProduct.value);
  }

  if (product.value) {
    allProducts.value.push(product.value);
  }
  selectedNewProduct.value = null;
}

// handle removal from order list
const removeFromTotalOrder = (itemToRemove: number) => {
  selectedNewProduct.value = null;
  allProducts.value = allProducts.value?.filter(product => product.id !== itemToRemove);
  totalOrder.value = totalOrder.value?.filter((product: OrderItem) => product.product_id !== itemToRemove);
}

// all total prices of products summarized
const totalSum = computed(() => {
  return totalOrder.value.reduce((sum: number, item: OrderItem) => sum + item.total, 0);  
});

// watch whether all inputs are correctly filled
watchEffect(() => {
  if (orderTitle.value && totalSum.value > 0) filledInputs.value = true;
  else filledInputs.value = false;
});

const create = () => {
  createOrder(totalOrder.value, orderTitle.value, totalSum.value);
}

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-8">
    <Menu />
    <div class="w-[50vw] h-[80vh] p-4 flex flex-col items-center gap-8 bg-neutral-800 rounded-2xl">
      <p class="text-neutral-100 text-2xl font-semibold">New order</p>
      <OrdersOrderTable :products="allProducts" 
        @remove-item="removeFromTotalOrder"
        @update-item="updateTotalOrder"
      />

      <span class="flex gap-8">
        <Select v-model="selectedNewProduct" :options="options" 
          optionLabel="label" optionValue="value" optionDisabled="disabled"
          placeholder="Select product" class="w-64"
        >
          <template #option="slot">
            <div class="w-full flex justify-between items-center">
              {{ slot.option.label }}
              <span v-if="slot.option.disabled" class="text-xs font-semibold text-red-500">
                Out of stock
              </span>
            </div>
          </template>
        </Select>
        <Button @click="handleAddToOrder" label="Add to your order" icon="pi pi-plus-circle" :disabled="!isProductSelected || options.length === 0"/>
      </span>
      <span class="w-full h-24 flex flex-col gap-4 items-end mt-auto">
        <p class="text-neutral-100 text-xl font-semibold">Order total: ${{ totalSum.toFixed(2) }}</p>
        <span class="flex gap-8">
          <InputText v-model="orderTitle" placeholder="Order title" />
          <Button v-if="!loading" @click="create" label="Order" class="w-32" :disabled="!filledInputs"/>
          <Button v-else icon="pi pi-spin pi-spinner" class="w-32"/>
        </span>
      </span>
    </div>
  </div> 
</template>