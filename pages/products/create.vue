<script setup lang="ts">
import Menu from '~/components/Menu.vue';
import type Product from '~/types/ProductType';

const { loading } = useProduct();

const newProductData = ref<Product>({
  id: 0,
  name: "",
  code: "",
  isPublic: true,
  price: 0,
  availability: 0,
  user_id: ""
});

const { addNewProduct } = useProduct();

const handleCreateProduct = () => {
  addNewProduct(newProductData.value);

  newProductData.value = {
    id: 0,
    name: "",
    code: "",
    isPublic: true,
    price: 0,
    availability: 0,
    user_id: ""
  };

  navigateTo("/products");
}
</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-8">
    <Menu />
    <div v-if="loading" class="absolute top-1/2">
      <i class="pi pi-spin pi-spinner text-white"></i>
    </div>
    <div class="w-[28vw] h-[70vh] p-4 flex flex-col items-center gap-8 bg-neutral-800 rounded-2xl"> 
    <p class="text-neutral-100 text-2xl font-semibold">Add new product</p>
    
    <div class="w-[70%] flex flex-col gap-12">
      <InputGroup class="w-10">
        <InputGroupAddon >
          <i class="pi pi-folder"></i>
        </InputGroupAddon>
        <IftaLabel class="w-[70%]">
          <InputText id="name" v-model="newProductData.name" class="h-12 font-semibold"/>
          <label for="name">Product name</label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon >
          <i class="pi pi-barcode"></i>
        </InputGroupAddon>
        <IftaLabel>
          <InputText id="code" v-model="newProductData.code" class="h-12 font-semibold"/>
          <label for="code">Code</label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon >
          <i class="pi pi-dollar"></i>
        </InputGroupAddon>
        <IftaLabel class="w-[70%]">
          <InputNumber id="price" v-model="newProductData.price" class="h-12 font-semibold"
            :minFractionDigits="0" :maxFractionDigits="2"/>
          <label for="price">Price</label>
        </IftaLabel>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon >
          <i class="pi pi-box"></i>
        </InputGroupAddon>
        <IftaLabel class="w-[70%]">
          <InputNumber id="availability" v-model="newProductData.availability" class="h-14 font-semibold"
            :maxFractionDigits="0" :min="0"/>
          <label for="availability">Availability</label>
        </IftaLabel>
      </InputGroup>

      <div class="w-full flex items-center justify-evenly">
         <p class="text-neutral-500 text-lg font-semibold">Set visibility to</p>
        <SelectButton v-model="newProductData.isPublic" 
        :options="[{ label: 'Public', value: true }, { label: 'Private', value: false }]"
        optionLabel="label" optionValue="value"
        :default-value="true"
        />
      </div>
    </div>
    <div class="flex w-96 justify-between mt-auto">
      <Button @click="navigateTo('/products')" label="Cancel" size="medium" class="w-36" raised />
      <Button @click="handleCreateProduct" label="Submit" size="medium" class="w-36" raised />
    </div>
  </div>
  </div>
</template>