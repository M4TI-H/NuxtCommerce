  <script setup lang="ts">
  import type OrderItem from '~/types/OrderItemType'; 

  const { productID } = defineProps<{
    productID: number
  }>();

  const emit = defineEmits<{
    (e: "update-item", payload: OrderItem): void,
    (e: "remove-item", payload: number): void,
  }>();

  const { product, fetchOneProduct } = useProduct();
  onMounted(() => fetchOneProduct(productID));

  const selectedQuantity = ref<number>(1);
  const productData = ref<OrderItem>({
    product_id: productID,
    quantity: 1,
    price: 0,
    total: 0
  });

  // change quantity to minimal if input field left empty
  const handleQuantityChange = async(quantity: number | null) => {
    if (!quantity) {
      selectedQuantity.value = 1;
    }
  }

  // emit values on load of product and change of its quantity
  watch([product, selectedQuantity], ([p, q]) => {
    if (!p) return;

    productData.value = {
      product_id: p.id,
      quantity: q,
      price: p.price,
      total: p.price * q
    };

    emit("update-item", productData.value);
  });

  const removeProduct = () => emit("remove-item", productID);

  </script>

  <template>
    <div v-if="product" class="w-[90%] h-12 border-neutral-400 border-b-2 flex items-center justify-between px-8 gap-2">
      <span class="flex gap-8 items-center">
        <span class="flex flex-col">
          <p class="text-neutral-100 text-lg font-semibold">{{ product.name }}</p>
          <p class="text-neutral-400 text-xs font-semibold">#{{ product.code }}</p>
        </span>
        <p class="text-neutral-100 text-md font-semibold">${{ product.price }}</p>
      </span>
      <span class="flex items-center gap-4">
        <p class="text-neutral-400 text-xs font-semibold">Quantity:</p>
        <InputNumber v-model="selectedQuantity" :inputStyle="{'width': '5vw', 'height': '4vh'}"
        :min="1" @update:modelValue="handleQuantityChange"/>
        <Button @click="removeProduct" icon="pi pi-times" variant="text" rounded size="small"/>
      </span>
    </div>
  </template>