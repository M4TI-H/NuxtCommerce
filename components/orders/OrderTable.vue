<script setup lang="ts">
import type Product from '~/types/ProductType';
import type OrderItem from '~/types/OrderItemType';

const { products } = defineProps<{
  products: Product[]
}>();

const emit = defineEmits<{
  (e: "update-item", payload: OrderItem): void,
  (e: "remove-item", payload: number): void
}>();

const selectedQuantities = ref<Record<number, number>>({});

// initialize product
watchEffect(() => {
  for (const product of products) {
    if (!(product.id in selectedQuantities.value)) {
      selectedQuantities.value[product.id] = 1;
    }

    const productData = {
      product_id: product.id,
      name: product.name,
      quantity: selectedQuantities.value[product.id],
      price: product.price,
      total: product.price * selectedQuantities.value[product.id],
    }

    emit("update-item", productData);
  }
});

// change quantity to minimal if input field left emptym, 
// otherwise modify product quantity
const handleQuantityChange = async(item: Product, quantity: number | null) => {
  if (!quantity) {
    selectedQuantities.value[item.id] = 1;
    quantity = 1;
  }

  const productData = {
    product_id: item.id,
    name: item.name,
    quantity: quantity,
    price: item.price,
    total: item.price * quantity
  }

  emit("update-item", productData);
}
</script>

<template>
  <div class=" max-w-[45vw] flex flex-col items-center">
    <DataTable :value="products" dataKey="id" showGridlines stripedRows>
      <Column field="name" header="Name"></Column>
      <Column field="code" header="Code">
        <template #body="slot">
          #{{ slot.data.code }}
        </template>
      </Column>
      <Column field="price" header="Price ($)">
        <template #body="slot">
          ${{ slot.data.price.toFixed(2) }}
        </template>
      </Column>
      <Column field="availability" header="Availability">
        <template #body="slot">
          {{ `In stock: ${slot.data.availability} pcs`}}
        </template>
      </Column>
      <Column field="quantity" header="Quantity">
        <template #body="slot">
          <div class="flex gap-2">
            <InputNumber v-model="selectedQuantities[slot.data.id]"
              :inputStyle="{'width': '5vw'}" :min="1" :max="slot.data.availability"
              :disabled="slot.data.availability === 0" :defaultValue="1"
              @update:modelValue="value => handleQuantityChange(slot.data, value)"
            />
          </div>
        </template>
      </Column>
      <Column >
        <template #body="slot">
           <Button @click="emit('remove-item', slot.data.id)" icon="pi pi-times" variant="text" rounded size="small"/>
        </template>
      </Column>
    </DataTable>
  </div>
</template>