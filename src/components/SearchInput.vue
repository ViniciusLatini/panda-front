<script setup>
import { ref } from 'vue';
const loaded = ref(false);
const loading = ref(false);

const onClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
};
</script>

<template>
  <v-text-field :loading="loading" class="mx-auto my-10" placeholder="Busque o vídeo pelo título"
    append-inner-icon="mdi-magnify" density="comfortable" variant="solo" hide-details single-line
    persistent-placeholder :width="500" @click:append-inner="onClick" />
</template>