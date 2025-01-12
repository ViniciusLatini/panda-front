<script setup>

</script>

<template>
  <v-app-bar :elevation="5">
    <template #prepend>
      <v-img src="../assets/logo-light.svg" :height="70" :width="200" />
    </template>

    <template #append>
      <v-btn icon="mdi-logout" />
    </template>
  </v-app-bar>
</template>