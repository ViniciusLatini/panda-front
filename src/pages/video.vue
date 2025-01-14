<script setup>
import PandaPlayer from '@/components/PandaPlayer.vue';
import router from '@/router';
import { getVideoByIdService } from '@/services/videos';
import { onMounted, ref } from 'vue';

const video = ref('');

function goBack() {
  router.replace("/");
}

onMounted(async () => {
  const videoId = router.currentRoute.value.query.id;
  try {
    const res = await getVideoByIdService(videoId);
    video.value = res
  } catch (error) {
    console.log(error);
  }
})
</script>

<template>
  <v-container v-if="video" class="d-flex flex-column mt-10 align-center ga-10">
    <v-row class="align-self-start align-center ga-5 self-start w-100">
      <v-btn @click="goBack" density="comfortable" icon="mdi-arrow-left" />
      <h1>{{ video.title }}</h1>
    </v-row>

    <v-container :max-width="920" class="mx-auto" style="padding:0">
      <PandaPlayer :video-player="video.video_player" />
    </v-container>

    <div class="text-justify" style="max-width: 920px;">
      <h2 class="mb-2">
        Descrição
      </h2>
      <p>{{ video.description }}</p>
    </div>
  </v-container>
  <v-container v-else class="d-flex align-center justify-center text-center h-50">
    <v-progress-circular indeterminate />
  </v-container>
</template>