<script setup lang="ts">
const supabase = useSupabaseClient();

const email = ref<string>("");
const password = ref<string>("");
const errMsg = ref<string>();
const filledInputs = ref<boolean>(false);

function isWhitespace(input: string) {
  return /^\s*$/.test(input);
}

const loginUser = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value.trim(),
    password: password.value
  });

  if (error) {
    return error.message;
  }

  return "success";
}

async function handleLogin() {
  if (!email.value || !password.value || isWhitespace(email.value) || isWhitespace(password.value)) {
    errMsg.value = "Please fill all form fields correctly.";
    return;
  }
  
  const response = await loginUser();
  if (response === "success"){
    navigateTo("/panel");
  }
  else {
    errMsg.value = response;
  }
}

watchEffect(() => {
  email.value && password.value ? filledInputs.value = true : filledInputs.value = false;
});

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center justify-center gap-8">

    <div v-if="errMsg" class="absolute top-[10%] w-96 h-12 bg-red-400 border-2 border-red-700 rounded-xl opacity-60 flex items-center justify-center">
      <p class="text-red-700 font-semibold">{{ errMsg }}</p>
    </div>

    <div class="w-96 h-[50vh] bg-neutral-800 flex flex-col items-center gap-16 p-8 pb-0 rounded-3xl shadow-xl">
      <p class="text-neutral-100 text-2xl font-semibold">Login to your account</p>
      <IftaLabel class="w-full">
        <InputText id="email" type="text" v-model="email" 
          class="w-full"/>
        <label for="email">Email</label>
      </IftaLabel>

      <IftaLabel class="w-full">
        <InputText id="password" type="password" v-model="password" 
          class="w-full"/>
        <label for="password">Password</label>
      </IftaLabel>

      <span class="w-full flex justify-around">
        <NuxtLink to="/">
          <Button label="Back" class="w-24"/>
        </NuxtLink>

        <Button @click="handleLogin"
          icon="pi pi-user" label="Login" raised 
          :disabled="!filledInputs" class="w-24"
        />
      </span>
      
    </div>
  </div>
</template>