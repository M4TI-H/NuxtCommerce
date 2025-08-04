<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

definePageMeta({
  middleware: 'auth'
});

const logOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return error.message;
  }
  return "success";
}

async function handleLogout() {
  const response = await logOutUser();
  if (response === "success") {
    navigateTo("/");
  }
  else {
    console.error(response);
  }
}


</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex items-center justify-center p-8">
    <div class="bg-neutral-800 w-[80rem] h-[40rem] rounded-2xl flex relative">
      <img src="https://images.unsplash.com/photo-1695985421335-7a2347a3e7db?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        class="absolute z-10 w-[50%] h-[100%] bottom-0 rounded-tr-[100%] rounded-l-2xl"
      />
      <div class="w-[50%] h-full flex flex-col z-20">
        <div class="h-[50%] w-full p-16 flex justify-center">
          <span class="flex flex-col">
            <p class="text-neutral-100 text-5xl font-semibold"><span class="text-emerald-600">Nuxt </span>Marketplace</p>
            <p class="text-neutral-100 text-2xl font-thin">Everything you ever need</p>
          </span>
        </div>
        
      </div>
      <div class="w-[50%] h-full flex flex-col">
        <div class="w-full h-[50%] flex flex-col items-center p-4">
          <p class="text-neutral-100 text-3xl font-semibold">Top products right now</p>
        </div>
        <div class="h-[50%] w-full flex flex-col items-center justify-center gap">
          <span class="flex gap-16">
            <Button @click="navigateTo('/products')" label="Products" icon="pi pi-box" class="w-40 h-14 shadow-xl"/>
            <Button @click="navigateTo('/orders')" label="Orders" icon="pi pi-shopping-cart" class="w-40 h-14 shadow-xl"/>
          </span>
          <span class="absolute flex flex-col items-center bottom-2">
            <p class="text-neutral-500 text-sm font-semibold">Logged as: {{ user!.email }} </p>
            <a @click="handleLogout" class="text-neutral-500 text-sm font-semibold underline hover:cursor-pointer">Log out</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>