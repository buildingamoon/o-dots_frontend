<template>
    <div>
      <div class="loading-screen" id="loadingScreen" ref="loadingScreen"></div>
      <div v-if="loading" class="loading-bar">Loading...</div>
      <div v-else-if="course" class="singlecourse">
        <div class="left">
          <div class="coursenav">
            <div class="core">
              <courseheader/>
              <label>{{ course.title }}</label><br>
            </div>
            <div class="sub">
              <label>Videos</label>
              <ul>
                <li v-for="video in course.videos" :key="video.url" @click="updateVideo(video)">
                  {{ video.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="bigright">
          <div class="middle">
            <div class="mediawrapper" v-if="currentVideo.url">
              <iframe :src="currentVideo.url" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
            </div>
            <p>{{ currentVideo.name }}</p>
          </div>
          <div class="right">
            <div class="tutorremark">
              <p>{{ currentVideo.tutorremarks }}</p>
            </div>
            <div class="notepad">
              <textarea placeholder="Drop your notes here..."></textarea>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No course data available</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import { useRoute, useRuntimeConfig, useFetch } from '#imports';
  
  const route = useRoute();
  const course = ref(null);
  const currentVideo = ref({
    name: '',
    url: '',
    tutorremarks: ''
  });
  const runtimeConfig = useRuntimeConfig();
  const loadingScreen = ref(null);
  const loading = ref(true);
  
  const fetchData = async () => {
    const courseId = route.params.id;
    console.log('Fetching course with ID:', courseId); // Debug log
  
    const timestamp = new Date().getTime(); // Generate a timestamp to ensure unique requests
  
    try {
      const { data, error } = await useFetch(`${runtimeConfig.public.apiBase}courses/${courseId}?timestamp=${timestamp}`);
      console.log('API Base URL:', `${runtimeConfig.public.apiBase}courses/${courseId}?timestamp=${timestamp}`); // Debug log
      
      if (error.value) {
        console.error('Error fetching course:', error.value); // Debug log
      } else {
        console.log('API Response:', data.value); // Log the entire response
      }
      
      if (data.value) {
        console.log('Fetched course data:', data.value); // Debug log
        course.value = data.value;
        if (course.value.videos && course.value.videos.length > 0) {
          currentVideo.value = course.value.videos[0]; // Set the first video as the current video
          console.log('Set current video:', currentVideo.value); // Debug log
        }
      } else {
        console.log('No data received from API'); // Debug log
      }
  
    } catch (err) {
      console.error('Fetch Error:', err); // Additional error handling
    } finally {
      loading.value = false; // Set loading to false once data fetching is complete
    }
  
    setTimeout(() => {
      if (loadingScreen.value) {
        loadingScreen.value.classList.add('dim');
      }
    }, 1000);
  };
  
  onMounted(async () => {
    await nextTick();
    await fetchData(); // Call the fetchData function within onMounted
  });
  
  const updateVideo = (video) => {
    currentVideo.value = video;
    console.log('Updated current video:', currentVideo.value); // Debug log
  };
  </script>
  
  <style scoped>
  .loading-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f3f3f3;
    text-align: center;
    padding: 10px 0;
    font-weight: bold;
  }
  </style>
  