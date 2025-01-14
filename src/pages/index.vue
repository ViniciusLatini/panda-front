<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { getVideosService } from '@/services/videos';
import FlipCard from '@/components/FlipCard.vue';

const videos = ref([])


const loaded = ref(false);
const loading = ref(false);
const search = ref('')

const filteredVideos = computed(() => {
  return videos.value.filter(video => video.title.toLowerCase().includes(search.value.toLowerCase()));
});

watch(filteredVideos , () => {
  loaded.value = true;
  loading.value = false;
});

watch(search, (current, old) => {
  current !== old && (loading.value = true);
});

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
  <v-text-field v-model="search" :loading="loading" class="mx-auto my-10" placeholder="Busque o vídeo pelo título"
    append-inner-icon="mdi-magnify" density="comfortable" variant="solo" hide-details single-line persistent-placeholder
    :width="500" />

  <div class="cardsContainer mx-10">
    <FlipCard v-for="video in filteredVideos" :key="video.id" :video="video" />
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