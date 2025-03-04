<template>
  <main class="card-container">
    <Swiper
      :slides-per-view="3"
      :space-between="1"
      pagination
      navigation
      mousewheel
      class="mySwiper"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index" class="Sliderwrap">
        <div class="card">
          <a>hi</a>
          <img :src="image.src" :alt="image.alt">
        </div>
      </SwiperSlide>
    </Swiper>
  </main>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

const images = [
  { src: '/public/picture/ADDBG.png', alt: 'Image 1' },
  { src: '/public/picture/cry.png', alt: 'Image 2' },
  { src: '/public/picture/ADDBG.png', alt: 'Image 3' },
  { src: '/public/picture/cry.png', alt: 'Image 4' },
  { src: '/public/picture/cry.png', alt: 'Image 5' },
  { src: '/public/picture/cry.png', alt: 'Image 6' },
];
</script>

<style>
.card-container {
  width: 100%;
  height:30vh;
  margin: auto;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.253);
  justify-content: center;
  color: white;
}

.mySwiper img {
  width: 20vh;
  height: 20vh;
  background:rgba(0, 0, 0, 0.171);
}

.mySwiper {
  width: 100%;
  height: 100%;
  background: black;
}

.Sliderwrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height:40vh;
}
.swiper-button-prev{
  /*opacity: 0;*/
  color: yellow;
  size:2vh;
}
.swiper-button-next{
  /*opacity: 0;*/
  color: yellow;
  size:2vh;
}
</style>
