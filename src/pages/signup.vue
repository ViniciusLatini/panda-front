<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import router from '@/router'
import { signUpService } from '@/services/user'

const visible = ref(false)
const signupError = ref({
  show: false,
  message: 'Falha ao criar conta, tente novamente.',
  title: 'Erro ao criar conta'
})
const loading = ref(false)

const { handleSubmit } = useForm({
  validationSchema: {
    email(value) {
      if (value?.length) {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regexEmail.test(value))
          return true

        return 'E-mail inválido.'
      }

      return 'Campo obrigatório.'
    },
    password(value) {
      if (value?.length) return true

      return 'Campo obrigatório.'
    }
  },
})
const email = useField('email')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  signupError.value.show = false
  loading.value = true
  try {
    await signUpService(values)
    router.replace("/signin")
  } catch (error) {
    signupError.value.show = true
    if (error.status == 409) {
      signupError.value.title = 'Falha ao realizar cadastro'
      signupError.value.message = 'Email já cadastrado.'
    }
    console.log('error:', error);
  }
  loading.value = false
})

</script>

<template>
  <v-container class="fill-height">
    <div class="rounded-lg container bg-grey-lighten-4 mx-auto px-5 py-5 align-center justify-start">
      <v-img src="../assets/logo.svg" max-height="105" max-width="250" class="mx-auto mb-3" />

      <p class="text-center mb-3">
        Insira suas credenciais criar sua conta!
      </p>

      <v-alert v-if="signupError.show" text="Verifique suas credenciais e tente novamente." class="mb-3"
        title="Credenciais inválidas" type="error" />

      <form @submit.prevent="submit" class="mb-6">
        <v-text-field v-model="email.value.value" variant="outlined" :error-messages="email.errorMessage.value"
          label="Email" placeholder="Digite seu email" />

        <v-text-field v-model="password.value.value" variant="outlined" :error-messages="password.errorMessage.value"
          label="Senha" placeholder="Digite sua senha" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'" @click:append-inner="visible = !visible" />

        <v-btn :loading="loading" class="mt-5 pa-6" type="submit" block>
          Criar conta
        </v-btn>
      </form>

      <p class="text-center">
        Já possui uma conta? 
        <router-link to="/signin">Clique aqui!</router-link>
      </p>
    </div>
  </v-container>
</template>

<style>
.container {
  width: 400px;
}

.v-input {
  margin-bottom: 10px;
}
</style>