<script setup>

const { videoPlayer } = defineProps(['videoPlayer']);
</script>

<template>
  <div class="row">
    <div class="col-lg">
      <div style="position:relative;padding-top:56.25%;">
        
        <iframe id="panda-player"
          :src="videoPlayer"
          style="border:none;position:absolute;top:0;height:100%;width:100%; border-radius: 10px;"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" allowfullscreen="true" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>