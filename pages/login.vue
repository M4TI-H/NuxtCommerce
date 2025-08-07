<script setup lang="ts">
import { Form, Field } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const supabase = useSupabaseClient();
const email = ref<string>("");
const password = ref<string>("");
const errMsg = ref<string>("");
const loading = ref<boolean>(false);

const handleLogin = async () => {
  loading.value = true;
  try {
     const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value
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

const schema = z.object({
  email: z.string().nonempty({message: "Email is required"}).email({message: "Incorrect email format"}),
  password: z.string().nonempty("Password is required")
});

const validationSchema = toTypedSchema(schema);

</script>

<template>
  <div class="fixed bg-neutral-700 w-screen h-screen flex flex-col items-center justify-center gap-8">
    <div class="w-[60rem] h-[30rem] bg-neutral-800 flex flex-row justify-center gap-16 rounded-3xl shadow-xl">
      <div class="w-[50%] p-8 flex flex-col items-center gap-16">
        <p class="text-neutral-100 text-3xl font-semibold">Login to your account</p>
          <Form @submit="handleLogin" :validationSchema="validationSchema" :validateOnInput="false" :validateOnBlur="true" 
            v-slot="{ meta }" class="flex flex-col gap-10"
          >
            <Field name="email" v-slot="{ field, errorMessage}">
              <IftaLabel class="w-[16rem] h-[6rem]">
                <InputText v-bind="field" type="text" class="w-full h-14"/>
                <label for="email">Email</label>
                <small v-if="errorMessage" class="text-red-500">*{{ errorMessage }}</small>
              </IftaLabel>
            </Field>

            <Field name="password" v-slot="{field, errorMessage}">
               <IftaLabel class="w-[16rem] h-[6rem]">
                <Password  v-bind="field" :inputStyle="{ width: '16rem' }"
                  class="h-14" toggleMask :feedback="false"/>
                <label for="password">Password</label>
                <small v-if="errorMessage" class="text-red-500">{{ errorMessage }}</small>
              </IftaLabel>
            </Field>

            <div class="flex gap-16">
              <NuxtLink to="/">
                <Button label="Back" class="w-24"/>
              </NuxtLink>

              <Button v-if="!loading" type="submit" icon="pi pi-user" label="Login"
                :disabled="!meta.valid || !meta.dirty" raised class="w-24"/>
              <Button v-else icon="pi pi-spin pi-spinner" 
                raised class="w-24"/>
            </div>
          </Form>
      </div>
      <div class="w-[50%] h-full flex justify-center items-center">
        <img src="https://images.unsplash.com/photo-1635468609223-4e59675ac96d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="w-[90%] h-[90%] rounded-xl"/>
      </div>
    </div>
  </div>
</template>