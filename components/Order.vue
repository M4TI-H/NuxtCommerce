<script setup lang="ts">
const orderTableDisplay = ref<boolean>(false);

const showOrderTable = () => orderTableDisplay.value = !orderTableDisplay.value;

</script>

<template>
  <span class="w-full flex flex-col items-center">
    <div @click="showOrderTable"
      class="w-[60%] h-16 bg-emerald-600 rounded-2xl flex items-center justify-between p-4 
      hover:bg-emerald-700 hover:cursor-pointer"
    >
      <p class="text-neutral-50 text-xl font-semibold">Order name | Order date | Order price</p>
      <i v-if="!orderTableDisplay" class="pi pi-angle-right"></i>
      <i v-if="orderTableDisplay" class="pi pi-angle-down"></i>
    </div>
    <div v-if="orderTableDisplay" class="w-[58%] h-100 bg-neutral-500 rounded-b-2xl">
      
    </div>
  </span>
</template>