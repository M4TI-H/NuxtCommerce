<script setup lang="ts">
import Menu from '~/components/Menu.vue';
const supabase = useSupabaseClient();

definePageMeta({
  middleware: () => {
    const user = useSupabaseUser();
    if (!user.value) {
      return navigateTo("/");
    }
  }
});

export interface ProductType {
  name: string;
  code: number;
  isPublic: boolean;
  price: number;
}

const newProductData = ref<ProductType>({
  name: "",
  code: 0,
  isPublic: false,
  price: 0
})

const productsData = ref<ProductType[]>();

async function fetchProducts() {
  const { data, error } = await supabase
  .from("products")
  .select("*")

  if (error) {
    console.error(error);
    return;
  }

  productsData.value = data;
}

onMounted(async () => fetchProducts());

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center p-8 gap-8">
    <Menu />
    <div class="w-[90%] h-full flex flex-wrap gap-8">
      <div class="w-64 h-96 p-4 pb-8 flex flex-col items-center gap-4 bg-neutral-800 rounded-2xl"> 
        <p class="text-neutral-100 text-2xl font-semibold">Add new product</p>
         <IftaLabel>
          <InputText id="name" v-model="newProductData.name"/>
          <label for="name">Product name</label>
        </IftaLabel>
        <IftaLabel>
          <InputNumber id="price" v-model="newProductData.price"/>
          <label for="price">Price</label>
        </IftaLabel>
        <span class="w-full flex items-center justify-evenly">
          <p class="text-neutral-100 text-md">Set visibility to</p>
            <Button
            @click="newProductData.isPublic = !newProductData.isPublic"
            :icon="newProductData.isPublic ? 'pi pi-lock-open' : 'pi pi-lock'"
            :label="newProductData.isPublic ? 'Public' : 'Private'"
            size="small" class="w-20"
          />
        </span>
        <Button label="Submit" class="mt-auto"/>
      </div>
      <Product v-for="product in productsData" :product="product"/>
    </div>
  </div>
</template>