<script setup lang="ts">
import Menu from '~/components/Menu.vue';
import type OrderDetail from '~/types/OrderDetailType';
import type OrderItem from '~/types/OrderItemType';
import type Order from '~/types/OrderType';
const supabase = useSupabaseClient();
const user = useSupabaseUser();

definePageMeta({
  middleware: 'auth'
});

const { publicProductsData, fetchPublicProducts } = useFetchProducts();
onMounted(async () => await fetchPublicProducts());

const selectedNewProduct = ref<number | null>(null);
const isProductSelected = ref<boolean>(false);
const productsID = ref<number[]>([]);

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

const totalOrder = ref<OrderItem[]>([]);
// updateTotalOrder - add or update data of product added to the order
const updateTotalOrder = (updatedItem: OrderItem) => {
  const item_id = totalOrder.value.findIndex(item => item.product_id === updatedItem.product_id);

  if (item_id !== -1) {
    totalOrder.value[item_id] = updatedItem;
  }
  else {
    totalOrder.value.push(updatedItem);
  }
}

const removeFromTotalOrder = (itemToRemove: number) => {
  productsID.value = productsID.value?.filter(id => id !== itemToRemove);
  totalOrder.value = totalOrder.value?.filter(product => product.product_id !== itemToRemove);
}

const totalSum = computed(() => {
  return totalOrder.value.reduce((sum, price) => sum + price.total, 0);  
});

const orderTitle = ref<string>("");
const filledInputs = ref<boolean>(false);
watchEffect(() => {
  if (orderTitle.value && totalSum.value > 0) filledInputs.value = true;
  else filledInputs.value = false;
})


async function createOrder() {
  if (!user.value) {
    return;
  }
  
  const { data: newOrder, error } = await supabase
  .from("orders")
  .insert({
    order_title: orderTitle.value,
    total_price: totalSum.value,
    user_id: user.value.id
  } as any)
  .select("id")
  .single<Order>();

  if (error || !newOrder) {
    console.error(error);
    return;
  }

  const orderItems: OrderDetail[] = totalOrder.value.map(item => ({
    order_id: newOrder.id,
    product_id: item.product_id!,
    quantity: item.quantity,
    price_at_order: item.price,
    user_id: user.value!.id
  }));

  const { error: details } = await supabase
  .from("ordersDetails")
  .insert(orderItems as any);

  if (error) {
    console.error(details);
    return;
  }

  orderTitle.value = "";

  navigateTo("/orders");
}

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
          <Button @click="createOrder" label="Order" class="w-32" :disabled="!filledInputs"/>
        </span>
      </span>
    </div>
  </div> 
</template>