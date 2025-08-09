<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const supabase = useSupabaseClient();
const errMsg = ref<string>("");
const loading = ref<boolean>(false);

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().nonempty({message: "Email is required"}).email({message: "Incorrect email format"}),
    password: z.string().nonempty("Password is required")
  })
);

const { handleSubmit, errors, meta } = useForm({
  validationSchema,
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const handleLogin = async (values: { email: string; password: string }) => {
  loading.value = true;
  try {
     const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password
    });

    loading.value = false;

    if (error) {
      errMsg.value = error.message;
    }
    if (data.user) {
      navigateTo("/panel");
    }
  }
  catch (error: any) {
    loading.value = false;
    errMsg.value = error.message;
  }
}

const onSubmit = handleSubmit(handleLogin);

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center justify-center gap-8">
    <div class="w-[60rem] h-[30rem] bg-neutral-800 flex flex-row justify-center gap-16 rounded-3xl shadow-xl">
      <div class="w-[50%] p-8 flex flex-col items-center gap-16">
        <p class="text-neutral-100 text-3xl font-semibold">Login to your account</p>
          <form @submit="onSubmit"class="flex flex-col gap-10">
              <IftaLabel class="w-[16rem] h-[6rem]">
                <InputText v-model="email" type="text" class="w-full h-14"/>
                <label for="email">Email</label>
                <small v-if="errors.email" class="text-red-500">*{{ errors.email }}</small>
              </IftaLabel>

               <IftaLabel class="w-[16rem] h-[6rem]">
                <Password  v-model="password" :inputStyle="{ width: '16rem' }"
                  class="h-14" toggleMask :feedback="false"/>
                <label for="password">Password</label>
                <small v-if="errors.password" class="text-red-500">*{{ errors.password }}</small>
              </IftaLabel>

            <div class="flex gap-16">
              <NuxtLink to="/">
                <Button label="Back" class="w-24"/>
              </NuxtLink>

              <Button v-if="!loading" type="submit" icon="pi pi-user" label="Login"
                :disabled="!meta.valid || !meta.dirty" raised class="w-24"/>
              <Button v-else icon="pi pi-spin pi-spinner" raised class="w-24"/>
            </div>
          </form>
      </div>
      <div class="w-[50%] h-full flex justify-center items-center">
        <img src="https://images.unsplash.com/photo-1635468609223-4e59675ac96d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="w-[90%] h-[90%] rounded-xl"/>
      </div>
    </div>
  </div>
</template>