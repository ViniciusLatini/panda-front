<script setup>
import { onMounted, ref } from 'vue';
import { getVideosService } from '@/services/videos';
import FlipCard from '@/components/FlipCard.vue';

const videos = ref([])

const loaded = ref(false);
const loading = ref(false);

const onClick = () => {
  console.log('aqui');
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
};

onMounted(async () => {
  try {
    const res = await getVideosService()
    videos.value = res
    console.log('res: ', res)
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <v-text-field  :loading="loading" class="mx-auto my-10" placeholder="Busque o vídeo pelo título"
    append-inner-icon="mdi-magnify" density="comfortable" variant="solo" hide-details single-line persistent-placeholder
    :width="500" @click="onClick" />

  <div class="cardsContainer mx-10">
    <FlipCard v-for="video in videos" :key="video.id" :video="video" />
  </div>
</template>

<style scoped>
.cardsContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 0 auto;
  justify-items: center;
}
</style>