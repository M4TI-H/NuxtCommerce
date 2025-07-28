<script setup lang="ts">
import type ProductType from '~/types/ProductType';
const supabase = useSupabaseClient<any>();  //add product table type interface
const user = useSupabaseUser();

const { product } = defineProps<{
  product: ProductType,
}>();

const name = ref<string>(product.name);
const price = ref<number>(product.price);
const code = ref<string>(product.code);
const isPublic = ref<boolean>(product.isPublic);

const emit = defineEmits<{
  (e: "confirm"): void, 
  (e: "cancel"): void
}>();

async function editProduct(id: number) {
  if(!user.value) {
    return;
  }

  const { error } = await supabase
  .from("products")
  .update({
    name: name.value,
    price: price.value,
    code: code.value,
    isPublic: isPublic.value,
    user_id: user.value.id
  } as any)
  .eq("id", id)

  if (error) {
    console.log(error);
    return;
  }
  emit("confirm");
}

</script>

<template>
  <IftaLabel class="mt-4">
    <InputText id="name" v-model="name" class="h-12"/>
    <label for="name">Product name</label>
  </IftaLabel>
  <IftaLabel>
    <InputNumber id="price" v-model="price" class="h-12"
      :minFractionDigits="0" :maxFractionDigits="2"/>
    <label for="price">Price</label>
  </IftaLabel>
  <IftaLabel>
    <InputText id="code" v-model="code" class="h-12"/>
    <label for="code">Code</label>
  </IftaLabel>

  <span class="w-[90%] flex items-center justify-between">
    <p class="text-neutral-100 text-md">Set visibility to</p>
    <Button
      @click="isPublic = !isPublic"
      :icon="isPublic ? 'pi pi-lock-open' : 'pi pi-lock'"
      :label="isPublic ? 'Public' : 'Private'"
      size="small" class="w-20"
    />
  </span>
  <span class="w-full flex items-center justify-evenly mt-auto">
    <Button @click="emit('cancel')" label="Cancel" />
    <Button @click="editProduct(product.id)" label="Confirm"/>
  </span>
</template>