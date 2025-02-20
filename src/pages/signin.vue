<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAppStore } from '@/stores/app'
import router from '@/router'

const appStore = useAppStore()
const visible = ref(false)
const signinError = ref({
  show: false,
  message: 'Falha ao realizar login, tente novamente.',
  title: 'Erro ao realizar login'
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
  signinError.value.show = false
  loading.value = true
  try {
    await appStore.signIn(values)
    router.push("/")
  } catch (error) {
    signinError.value.show = true
    if (error.status == 401) {
      signinError.value.message = 'Usuário ou senha inválidos, tente novamente.'
      signinError.value.title = 'Credenciais inválidas'
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
        Insira suas credenciais para acessar seus vídeos!
      </p>

      <v-alert v-if="signinError.show" text="Verifique suas credenciais e tente novamente." class="mb-3"
        title="Credenciais inválidas" type="error" />

      <form @submit.prevent="submit" class="mb-6">
        <v-text-field v-model="email.value.value" variant="outlined" :error-messages="email.errorMessage.value"
          label="Email" placeholder="Digite seu email" />

        <v-text-field v-model="password.value.value" variant="outlined" :error-messages="password.errorMessage.value"
          label="Senha" placeholder="Digite sua senha" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'" @click:append-inner="visible = !visible" />

        <v-btn :loading="loading" class="mt-5 pa-6" type="submit" block>
          Entrar
        </v-btn>
      </form>

      <p class="text-center">
        Não possui uma conta? 
        <router-link to="/signup">Clique aqui!</router-link>
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