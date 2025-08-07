<script setup lang="ts">
const supabase = useSupabaseClient();

const email = ref<string>("");
const password = ref<string>("");
const passwordRepeat = ref<string>("");
const errMsg = ref<string>();
const filledInputs = ref<boolean>(false);
const loading = ref<boolean>(false);

function isWhitespace(input: string) {
  return /^\s*$/.test(input);
}

const registerUser = async () => {
  loading.value = true;
  const { error } = await supabase.auth.signUp({
    email: email.value.trim(),
    password: password.value
  });

  if (error) {
    return error.message;
  }

  loading.value = false;
  return "success";
}

async function handleRegister() {
  if (!email.value || !password.value || isWhitespace(email.value) || isWhitespace(password.value)) {
    errMsg.value = "Please fill all form fields correctly.";
    return;
  }

  if (password.value !== passwordRepeat.value) {
    errMsg.value = "Passwords are not the same.";
    return;
  }

  const response = await registerUser();
  if (response === "success"){
    navigateTo("/panel");
  }
  else {
    errMsg.value = response;
  }
}

watchEffect(() => {
  if (email.value && password.value) filledInputs.value = true;
  else filledInputs.value = false;
});

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center justify-center gap-8">

    <div v-if="errMsg" class="absolute top-[10%] w-96 h-12 bg-red-400 border-2 border-red-700 rounded-xl opacity-60 flex items-center justify-center">
      <p class="text-red-700 font-semibold">{{ errMsg }}</p>
    </div>

    <div class="w-[60rem] h-[30rem] bg-neutral-800 flex flex-row justify-center gap-16 rounded-3xl shadow-xl">
      <div class="w-[50%] p-8 flex flex-col items-center gap-12">
        <p class="text-neutral-100 text-3xl font-semibold">Register new account</p>
          <IftaLabel class="w-[16rem]">
            <InputText id="email" type="text" v-model="email" 
              class="w-full h-14"/>
            <label for="email">Email</label>
          </IftaLabel>

          <IftaLabel class="w-[16rem]">
            <Password id="password" v-model="password" :inputStyle="{ width: '16rem' }"
              class="h-14" toggleMask :feedback="false"/>
            <label for="password">Password</label>
          </IftaLabel>

          <IftaLabel class="w-[16rem]">
            <Password id="password" v-model="passwordRepeat" :inputStyle="{ width: '16rem' }"
              class="h-14" toggleMask :feedback="false"/>
            <label for="password">Repeat Password</label>
          </IftaLabel>
        
        <div class="flex gap-16">
          <NuxtLink to="/">
            <Button label="Back" class="w-24"/>
          </NuxtLink>

          <Button v-if="!loading" @click="handleRegister"
            icon="pi pi-user" label="Login" raised 
            :disabled="!filledInputs" class="w-24"/>
          <Button v-else icon="pi pi-spin pi-spinner" 
            raised class="w-24"/>
        </div>
      </div>
      <div class="w-[50%] h-full flex justify-center items-center">
        <img src="https://images.unsplash.com/photo-1635468609223-4e59675ac96d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="w-[90%] h-[90%] rounded-xl"/>
      </div>
    </div>
  </div>
</template>