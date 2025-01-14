<script setup>
import { ref } from "vue";

const flipped = ref(false);
const { video } = defineProps(["video"]);

const flip = () => {
  flipped.value = !flipped.value;
};

</script>

<template>
  <div :class="['card-container', flipped ? 'flipped' : '']" style="width: 300px; height: 200px; margin-bottom: 20px;"
    class="font-weight-light cursor-pointer" @mouseenter="flip" @mouseleave="flip">
    <div class="front rounded-lg" style="background-color: blue;">
      <v-img src="https://b-vz-01e39d53-1ec.tv.pandavideo.com.br/470abd28-1459-48de-9ef4-403bdc5c3046/thumbnail.jpg"
        alt="thumb" :width="300" :height="200" cover class="rounded-lg" />

      <div class="detailsContainer rounded-lg">
        <strong>{{ video.title }}</strong>
        <img src="../assets/pandaIcon.png" :width="25" :height="25" contain>
      </div>
    </div>
    <div class="back rounded-lg text-black ">
      <span class="text-subtitle-2">Descrição</span>
      <p class="text-justify text-caption h-50 back-description">
        {{ video.description }}
      </p>
      <span class="text-subtitle-2 text-decoration-underline">Clique para obter mais informações</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  margin: 0;
  padding: 0;
  top: 20px;
  position: relative;
  box-sizing: border-box;

  .front,
  .back {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition: -webkit-transform ease 500ms;
    transition: transform ease 500ms;
  }

  .front {
    z-index: 2;
    transform: rotateY(0deg);
    /* front tile styles go here! */
  }

  .back {
    transform: rotateY(-180deg);
    padding: 20px;
    font-size: 20px;
    background-color: #eee;
  }

  &.flipped {
    .front {
      transform: rotateY(180deg);
    }

    .back {
      transform: rotateY(0deg);
    }
  }
}

.detailsContainer {
  width: 100%;
  padding: 4.25rem 0.56rem 0.9rem 0.56rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.90) 67.08%);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.back-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  /* Define o número de linhas visíveis */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>