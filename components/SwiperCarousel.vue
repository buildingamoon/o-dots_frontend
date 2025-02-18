<template>
    <Swiper
        @swiper="onSwiper"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :modules="[Autoplay]"
        :slides-per-group="4"
        :slides-per-view="4"
        :space-between="30"
        >
        <SwiperSlide v-for="(item, index) in data" :key="index" :virtualIndex="index">
            <div class="schema-card">
            <div class="card-img"></div>
            <div class="card-tile">{{ item.title }}</div>
            <div class="card-text">{{ item.text }}</div>
            </div>
        </SwiperSlide>
    </Swiper>
  </template>
  

  