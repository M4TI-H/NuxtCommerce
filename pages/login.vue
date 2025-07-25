<script setup lang="ts">
import { Button } from 'primevue';

const email = ref<string>("");
const pass = ref<string>("");
const errMsg = ref<string>();
const filledInputs = ref<boolean>(false);

function isWhitespace(input: string) {
  return /^\s*$/.test(input);
}

async function handleLogin(email: string, pass: string) {
  console.log(`Submitted: ${email} and ${pass}`);
  if (!email || !pass) {
    errMsg.value = "Please fill all form fields.";
    return;
  }
  else if (isWhitespace(email) || isWhitespace(pass)){
    errMsg.value = "Please input correct data.";
    return;
  }

  navigateTo("/panel");
}

watchEffect(() => {
  if (email.value && pass.value) filledInputs.value = true;
  else filledInputs.value = false;
})

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
        <InputText id="password" type="password" v-model="pass" 
          class="w-full"/>
        <label for="password">Password</label>
      </IftaLabel>

      <span class="w-full flex justify-around">
        <Button as="a" href="/" label="Back" class="w-24"/>

        <Button @click="handleLogin(email, pass)"
          icon="pi pi-user" label="Login" raised 
          :disabled="!filledInputs" class="w-24"
        />
      </span>
      
    </div>
  </div>
</template>