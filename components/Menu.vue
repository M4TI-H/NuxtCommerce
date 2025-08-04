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
  <div class="w-[90%] h-16 bg-emerald-600 rounded-2xl
    flex items-center justify-between p-4">
    <p v-if="user?.email" class="w-[30%] text-neutral-100 text-xl font-semibold">Logged as: {{ user.email }}</p>
    <NuxtLink class="text-neutral-100 text-3xl font-semibold decoration-none text-center w-[30%]" to="/panel">Nuxt Commerce</NuxtLink>
    <div class="w-[30%] flex justify-end">
      <Button @click="handleLogout" label="Log out"/>
    </div>
  </div>
</template>