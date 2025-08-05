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
    <div class="bg-neutral-800 w-[80rem] h-[40rem] rounded-2xl flex flex-col sm:flex-row relative">
      <img src="https://images.unsplash.com/photo-1695985421335-7a2347a3e7db?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        class="absolute z-10 w-[100%] h-[50%] rounded-t-2xl 
        sm:w-[50%] sm:h-[100%] sm:bottom-0 sm:rounded-tr-[100%] sm:rounded-l-2xl"
      />
      <div class="sm:w-[50%] h-full flex flex-col z-20">
        <div class="sm:p-16 flex flex-col justify-center items-center">
          <div>
            <p class="text-neutral-100 text-3xl sm:text-5xl font-semibold sm:bg-neutral-800"><span class="text-emerald-400">Nuxt </span>Marketplace</p>
            <p class="text-neutral-100 text-lg sm:text-2xl font-thin sm:bg-neutral-800">Everything you ever need</p>
          </div>
        </div>
        <div class="h-full w-full sm:p-16 flex flex-col justify-end items-end">
          <a href="/orders" class="text-neutral-100 text-3xl sm:text-5xl hover:underline hover:cursor-pointer">Orders</a>
        </div>
      </div>

      <img src="https://images.unsplash.com/photo-1708617601522-e38301d5c825?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        class="absolute z-10 w-[100%] h-[50%] bottom-0 rounded-b-2xl
        sm:w-[50%] sm:h-[100%] sm:right-0 sm:rounded-bl-[100%] sm:rounded-r-2xl"
      />

      <div class="sm:w-[50%] h-full flex flex-col z-20">
        <div class="h-[50%] w-full flex flex-col sm:items-start justify-start sm:p-16">
          <a href="/products" class="text-neutral-100 text-3xl sm:text-5xl hover:underline hover:cursor-pointer">Products</a>
          <span class="absolute flex bottom-0 gap-2 px-2 bg-neutral-800 rounded-bl-2xl">
            <p class="text-neutral-500 text-xs sm:text-sm font-semibold">Logged as: {{ user!.email }} </p>
            <a @click="handleLogout" class="text-neutral-500 text-xs sm:text-sm font-semibold hover:underline hover:cursor-pointer">Log out</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>