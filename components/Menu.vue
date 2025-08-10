<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

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
  <div class="sm:w-[90%] w-full h-12 sm:h-16 bg-emerald-600 md:rounded-2xl
    flex items-center justify-between px-2 sm:px-4">
    <p v-if="user?.email" class="w-[30%] text-neutral-100 text-xs sm:text-xl font-semibold">Logged as: {{ user.email }}</p>
    <NuxtLink class="text-neutral-100 text-sm sm:text-xl lg:text-3xl font-semibold decoration-none text-center w-[30%]" to="/panel">Nuxt Marketplace</NuxtLink>
    <div class="w-[30%] flex justify-end">
      <Button @click="handleLogout" class="w-22 sm:w-24 h-10"><span class="text-white font-semibold">Log out</span></Button>
    </div>
  </div>
</template>