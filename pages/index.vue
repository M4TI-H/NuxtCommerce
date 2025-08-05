<script setup lang="ts">
definePageMeta({
  middleware: () => {
    const user = useSupabaseUser();
    if (user.value) {
      return navigateTo("/panel");
    }
  }
});

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex items-center justify-center">
    <div class="relative w-[88rem] h-[48rem] bg-black p-8 rounded-3xl shadow-xl">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1501523460185-2aa5d2a0f981?q=80&w=1231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="w-full h-full object-cover opacity-60 rounded-3xl"/> 
      </div>
      <div class="flex flex-col gap-16">
        <p class="text-neutral-100 text-xl font-semibold z-10 self-center sm:self-start"><span class="text-emerald-400">Nuxt </span>Marketplace</p>
        <p class="text-neutral-100 text-lg sm:text-3xl lg:text-5xl font-bold self-center z-10">Welcome to our marketplace</p>
        <p class="text-neutral-100 text-xs sm:text-md font-thin self-center text-center w-[18rem] sm:w-[36rem] lg:w-[44rem] z-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor, neque vitae eleifend rutrum, lacus odio commodo odio, eget viverra lorem lorem at justo. 
          Quisque malesuada risus id magna pulvinar placerat. In in faucibus urna, ut scelerisque dui. Donec ultricies eleifend est nec maximus. Phasellus lacus diam, aliquam
          ut ultricies in, venenatis ut nibh. Integer et lacus ligula. Integer purus enim, viverra vitae sagittis sit amet, tincidunt in turpis. Curabitur id augue aliquet, 
          malesuada metus vitae, consequat lorem. Duis convallis lorem quis porta bibendum. Nunc dolor orci, auctor quis pharetra non, aliquam et quam. Nam facilisis facilisis pellentesque.
        </p>
        <div class="w-64 flex justify-between self-center">
          <NuxtLink to="/login">
            <Button icon="pi pi-user" label="Login" class="w-24" severity="secondary" raised/>
          </NuxtLink>
          <NuxtLink to="/register">
            <Button icon="pi pi-user-plus" label="Register" class="w-24" severity="secondary" raised/>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>