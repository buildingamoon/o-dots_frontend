<template>
  <div v-if="isReady" class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="/public/picture/demo1.jpg" alt="Demo 1">
        <h3>Hi there</h3>
      </div>
      <div class="swiper-slide">
        <img src="/public/picture/demo2.jpg" alt="Demo 2">
        <h3>Hi there</h3>
      </div>
      <div class="swiper-slide">
        <img src="/public/picture/demo3.jpg" alt="Demo 3">
        <h3>Hi there</h3>
      </div>
      <div class="swiper-slide">
        <img src="/public/picture/demo1.jpg" alt="Demo 1">
        <h3>Hi there</h3>
      </div>
      <div class="swiper-slide">
        <img src="/public/picture/demo2.jpg" alt="Demo 2">
        <h3>Hi there</h3>
      </div>
      <div class="swiper-slide">
        <img src="/public/picture/demo1.jpg" alt="Demo 1">
        <h3>Hi there</h3>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from 'vue';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

export default {
  name: 'Swipercarouselsub',
  setup() {
    const isReady = ref(false);

    onMounted(() => {
      nextTick(() => {
        isReady.value = true;
      });
    });

    watch(isReady, (newVal) => {
      if (newVal) {
        nextTick(() => {
          const swiperContainer = document.querySelector('.swiper-container');
          if (swiperContainer) {
            const swiper = new Swiper(swiperContainer, {
              loop: true,
              grabCursor: true,
              spaceBetween: 30,
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
              keyboard: {
                enabled: true,
              },
              mousewheel: {
                thresholdDelta: 70,
              },
              breakpoints: {
                0: { slidesPerView: 3 },
                780: { slidesPerView: 3 },
                1200: { slidesPerView: 8 },
              },
            });
          } else {
            console.error('Swiper container not found');
          }
        });
      }
    });
  },
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 18px;
  background: #fff;
  justify-content: center;
  align-items: center;
}
.swiper-slide img {
  width: 100%;
  height: 150px;
}
</style>
