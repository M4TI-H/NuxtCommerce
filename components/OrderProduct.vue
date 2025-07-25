<script setup>
</script>

<template>
  <div class="w-[90%] h-24 border-neutral-400 border-b-2 flex items-center justify-between px-8 gap-2">
    <span class="flex gap-8 items-center">
      <span class="flex flex-col">
        <p class="text-neutral-100 text-2xl font-semibold">Product name</p>
        <p class="text-neutral-400 text-lg font-semibold">#Product code</p>
      </span>
      <p class="text-neutral-100 text-3xl font-semibold">Product price</p>
    </span>
    <span class="flex items-center gap-4">
      <p class="text-neutral-400 text-sm font-semibold">Quantity:</p>
      <InputNumber :inputStyle="{'width': '4vw'}"/>
      <Button icon="pi pi-times"/>
    </span>
  </div>
</template>