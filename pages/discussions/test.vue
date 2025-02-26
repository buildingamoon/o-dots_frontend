<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for="(item, index) in items" :key="index" class="swiper-slide">
        <img :src="item.course_id && item.course_id.photos && item.course_id.photos.length ? item.course_id.photos[0] : '/public/picture/inner.png'" alt="Product Photo">
        <h3>{{ item.productName }}</h3>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import { watch, onMounted } from 'vue';

export default {
  name: 'Swipercarouselsub',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const initializeSwiper = () => {
      new Swiper('.swiper-container', {
        loop: true,
        grabCursor: true,
        spaceBetween: 10,
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
    };

    watch(() => props.items, (newItems) => {
      if (newItems.length > 0) {
        initializeSwiper();
      }
    });

    onMounted(() => {
      if (props.items.length > 0) {
        initializeSwiper();
      }
    });
  }
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 25%;
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
