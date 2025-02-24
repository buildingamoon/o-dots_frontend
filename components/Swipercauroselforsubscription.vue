<template>
    <div>
        <div class="container swiper">
            <div class="card-list swiper-wrapper">
                <div v-for="(item, index) in items" :key="index" class="card-item swiper-slide">
                    <img :src="item.course_id && item.course_id.photos && item.course_id.photos.length ? item.course_id.photos[0] : '/public/picture/inner.png'" alt="Product Photo">
                    <h3>{{ item.productName }}</h3>
                </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
</template>
  
  <script>
  import { onMounted } from 'vue';
  import Swiper from 'swiper/bundle';
  import 'swiper/css/bundle';
  
  onMounted(() => {
    new Swiper('.swiper', {
      effect: 'coverflow',
      grabCursor: true,
      spaceBetween: 30,
      centeredSlides: false,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 1,
        slideShadows: false,
      },
      navigation: {
        nextEl: '.swiper-button-prev',
        prevEl: '.swiper-button-next',
      },
      loop: true,
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
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        955: {
          slidesPerView: 3,
        },
        996: {
          slidesPerView: 4,
        },
      },
    });
  });

  </script>
  
<style scoped>
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: "Poppins", sans-serif;
}

body {
display: flex;
align-items: center;
justify-content: center;
min-height: 100vh;
background: url("/public/picture/inner.png") black no-repeat center;
}

.card-list .card-item {
color: white;
width: 400px;
display: flex;
flex-direction: column;
justify-content: center;
backdrop-filter: blur(30px);
padding: 35px;
border-radius: 8px;
border: 1px solid rgba(255, 255, 255, 0.2);
background: rgb(0, 0, 0);
border: 1px solid rgba(255, 255, 255, 0.5);
}

.card-list .card-item img {
width: 150px;
height: 150px;
border-radius: 5%;
margin-bottom: 40px;
border: 3px solid white;
padding: 4px;
}

h3 {
font-size: 0.8em;
}

p {
font-size: 0.8em;
}
  
  
</style>