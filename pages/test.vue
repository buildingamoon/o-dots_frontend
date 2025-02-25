<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="/public/picture/demo1.jpg">
        <h3>Hi there</h3>
      </div>
      <div class="swiper-slide">
        <img src="/public/picture/demo2.jpg">
        <h3>Hi there</h3>
      </div>
      <div class="swiper-slide">
        <img src="/public/picture/demo3.jpg">
        <h3>Hi there</h3>
      </div>
      <div class="swiper-slide">
        <img src="/public/picture/demo1.jpg">
        <h3>Hi there</h3>
      </div>
      <div class="swiper-slide">
        <img src="/public/picture/demo2.jpg">
        <h3>Hi there</h3>
      </div>
      <div class="swiper-slide">
        <img src="/public/picture/demo1.jpg">
        <h3>Hi there</h3>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

export default {
  name: 'SwiperCarousel',
  setup() {
    onMounted(() => {
      new Swiper('.swiper-container', {
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
          0: {
            slidesPerView: 3,
          },
          780: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 8,
          },
        },
      });
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
  /* Center slide text vertically */
  justify-content: center;
  align-items: center;
}
.swiper-slide img {
  width: 100%;
  height: 150px;
}
</style>
