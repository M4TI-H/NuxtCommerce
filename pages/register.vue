<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { z } from "zod";
import { toTypedSchema } from '@vee-validate/zod';
const supabase = useSupabaseClient();
const errMsg = ref<string>();
const loading = ref<boolean>(false);

const validationSchema = toTypedSchema(
  z.object({
    email: z.string()
      .nonempty({message: "Email is required"})
      .email({message: "Incorrect email format"}),
    password: z.string()
      .nonempty({message: "Password is required"})
      .min(6, {message: "Password must include at least 6 characters"})
      .regex(/[!@#$%^&]/, { message: "At least one special character - !@#$%^&"})
      .regex(/(?=.*[A-Z])/, { message: "At least one capitalized letter" }),
    repeatPass: z.string()
      .nonempty({message: "Password is required"})
  }).refine(data => data.password === data.repeatPass, {
    message: "Passwords are not the same",
    path: ["repeatPass"]
  })
);

const { handleSubmit, errors, meta } = useForm({
  validationSchema,
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');
const { value: repeatPass } = useField<string>('repeatPass');

const handleRegister = async (values: { email: string; password: string, repeatPass: string }) => {
  loading.value = true;
  try {
    const { error } = await supabase.auth.signUp({
      email: values.email.trim(),
      password: values.password
    });

    loading.value = false;

    if (error) {
      errMsg.value = error.message;
      return;
    }

    navigateTo("/panel");
  }
  catch (error: any) {
    loading.value = false;
    errMsg.value = error.message;
  }
}

const onSubmit = handleSubmit(handleRegister);

</script>

<template>
  <div class="bg-neutral-700 w-screen min-h-screen flex flex-col items-center justify-center gap-8 overflow-auto p-4">
    <div class="relative flex flex-row items-center p-4 w-full max-w-[84rem] md:h-auto rounded-3xl shadow-2xl bg-neutral-800">
      <p class="absolute left-4 top-4 text-neutral-100 sm:text-xl font-semibold"><span class="text-emerald-500">Nuxt</span> Marketplace</p>

      <div class="w-full lg:w-[40rem] lg:max-w-[50%] p-8 flex flex-col items-center gap-4 xl:gap-8 pt-16 sm:pt-24">
        <div class="flex flex-col items-center gap-4">
          <p class="text-neutral-100 text-lg sm:text-2xl font-semibold">Register new account</p>
          <p class="text-neutral-100 w-64 sm:w-96 text-sm sm:text-md font-thin text-center">Create new account using your credentials to access Nuxt Marketplace - a trading platform for enterpreneurs.</p>
        </div>

        <form @submit="onSubmit" class="w-full flex flex-col items-center mt-2 xl:mt-8">
          <IftaLabel class="w-full max-w-[24rem] h-[6rem]">
            <InputText v-model="email" type="text" class="font-semibold w-full"/>
            <label for="email">Email</label>
            <p v-if="errors.email" class="text-red-500 text-sm sm:text-md ml-2 mt-1">{{ errors.email }}</p>
          </IftaLabel>

          <IftaLabel class="w-full max-w-[24rem] h-[6rem]">
            <Password v-model="password" :inputStyle="{width: '100%'}"
              class="w-full font-semibold h-14" toggleMask :feedback="false"/>
            <label for="password">Password</label>
            <p v-if="errors.password" class="text-red-500 text-sm sm:text-md ml-2 mt-1">{{ errors.password }}</p>
          </IftaLabel>

          <IftaLabel class="w-full max-w-[24rem] h-[6rem]">
            <Password  v-model="repeatPass" :inputStyle="{width: '100%'}"
              class="w-full font-semibold h-14" toggleMask :feedback="false"/>
            <label for="password">Repeat password</label>
            <p v-if="errors.repeatPass" class="text-red-500 text-sm sm:text-md ml-2 mt-1">{{ errors.repeatPass }}</p>
          </IftaLabel>

          <div class="flex flex-col items-center gap-4">
            <Button v-if="!loading" type="submit" icon="pi pi-user" label="Register" 
              :disabled="!meta.valid || !meta.dirty" raised class="w-[16rem] h-[3rem]"/>
            <Button v-else icon="pi pi-spin pi-spinner" raised class="w-[16rem] h-[3rem]"/>

            <NuxtLink to="/">
              <Button label="Back" class="w-[6rem] h-[2rem] xl:h-[3rem]"/>
            </NuxtLink>
          </div>
        </form>
      </div>
      <img src="https://images.unsplash.com/photo-1635468609223-4e59675ac96d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="hidden lg:flex w-[45rem] max-w-[50%] h-[95%] rounded-2xl"
      />
    </div>
  </div>
</template>