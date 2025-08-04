<script setup lang="ts">
import type Product from '~/types/ProductType';

const { product } = defineProps<{
  product: Product,
}>();

const { editProduct } = useProduct();

const newData = ref<Product>({
  id: product.id,
  name: product.name,
  price: product.price,
  code: product.code,
  isPublic: product.isPublic,
  availability: product.availability,
  user_id: product.user_id
});

const emit = defineEmits<{
  (e: "confirm"): void, 
  (e: "cancel"): void,
}>();

const handleEdit = () => {
  editProduct(newData.value, product.id);
  emit("confirm");
}

</script>

<template>
  <div class="w-[90%] flex flex-col gap-4">
    <InputGroup>
      <InputGroupAddon >
        <i class="pi pi-folder"></i>
      </InputGroupAddon>
      <IftaLabel >
        <InputText id="name" v-model="newData.name" class="h-12 font-semibold"/>
        <label for="name">Product name</label>
      </IftaLabel>
    </InputGroup>

    <InputGroup>
      <InputGroupAddon >
        <i class="pi pi-box"></i>
      </InputGroupAddon>
      <IftaLabel>
        <InputNumber id="availability" v-model="newData.availability" class="h-12 font-semibold"
          :maxFractionDigits="0" :min="0"/>
        <label for="availability">Availability</label>
      </IftaLabel>
    </InputGroup>

    <InputGroup>
      <InputGroupAddon >
        <i class="pi pi-dollar"></i>
      </InputGroupAddon>
      <IftaLabel>
      <InputNumber id="price" v-model="newData.price" class="h-12 font-semibold"
        :minFractionDigits="0" :maxFractionDigits="2"/>
        <label for="price">Price</label>
      </IftaLabel>
    </InputGroup>

    <InputGroup>
      <InputGroupAddon >
        <i class="pi pi-barcode"></i>
      </InputGroupAddon>
      <IftaLabel>
        <InputText id="code" v-model="newData.code" class="h-12 font-semibold"/>
        <label for="code">Code</label>
      </IftaLabel>
    </InputGroup>

    <div class="w-full flex items-center justify-evenly">
    <SelectButton v-model="newData.isPublic" size="small"
    :options="[{ label: 'Public', value: true }, { label: 'Private', value: false }]"
    optionLabel="label" optionValue="value"
    :default-value="newData.isPublic"
    />
  </div>
  </div>
  
  <span class="w-full flex items-center justify-evenly mt-auto">
    <Button @click="emit('cancel')" label="Cancel" class="w-20 h-8"/>
    <Button @click="handleEdit" label="Confirm" class="w-20 h-8"/>
  </span>
</template>