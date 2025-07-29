  <script setup lang="ts">
  import type ProductType from '~/types/ProductType';
  import type OrderItem from '~/types/OrderItemType';

  const supabase = useSupabaseClient();

  const { productID } = defineProps<{
    productID: number
  }>();

  const product = ref<ProductType>({
    id: 0,
    name: "",
    code: "",
    isPublic: false,
    price: 0,
    user_id: ""
  });

  const productData = ref<OrderItem>({
    product_id: product.value.id,
    quantity: 1,
    price: product.value.price,
    total: product.value.price
  });

  const emit = defineEmits<{
    (e: "update-item", payload: OrderItem): void,
    (e: "remove-item", payload: number): void,
  }>();

  const fetchProductData = async () => {
    const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productID)

    if (error) {
      console.error(error);
    }
    else {
      product.value = data[0];
    }
  };

  onMounted(async() => fetchProductData());

  const selectedQuantity = ref<number>(1);

  const handleQuantityChange = async(quantity: number | null) => {
    if (!quantity) {
      selectedQuantity.value = 1;
    }
  }

  // emit values on load of product and change of its quantity
  watch([() => product.value.id, selectedQuantity], ([id, quantity]) => {
    if (!id) return;

    productData.value = {
      product_id: id,
      quantity: quantity,
      price: product.value.price,
      total: product.value.price * quantity
    };

    emit("update-item", productData.value);
  });

  const removeProduct = () => {
    emit("remove-item", productID);
  }

  </script>

  <template>
    <div class="w-[90%] h-12 border-neutral-400 border-b-2 flex items-center justify-between px-8 gap-2">
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