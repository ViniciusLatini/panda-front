<script setup>
import router from '@/router';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();

</script>
<template>
  <v-app-bar v-if="router.currentRoute.value.path !== '/signin'" :elevation="5">
    <template #prepend>
      <v-img src="../assets/logo-light.svg" :height="70" :width="200" />
    </template>

    <template #append>
      <v-btn @click="appStore.logout()" icon="mdi-logout" />
    </template>
  </v-app-bar>
</template>