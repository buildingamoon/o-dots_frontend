<template>
    <div>
      <div class="upload-container">
        <div v-for="(video, index) in uploadedVideos" :key="index" class="video-preview">
          <video v-if="video" width="320" height="240" controls>
            <source :src="video" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <div class="upload-controls">
            <label :for="`upload${index}`">
              <p>(Max. size: 30MB)</p>
            </label>
            <input type="file" @change="(e) => uploadVideo(e, index)" :name="`upload${index}`" :id="`upload${index}`">
            <p v-if='uploading[index]'>Uploading...</p>
            <button @click="removeVideo(index)">Delete Video</button>
          </div>
        </div>
      </div>
      <br>
      <button @click="addVideoUploadField">Add More Video</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRuntimeConfig, useRoute } from '#imports';
  const user = getUser();
  
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();
  
  let uploading = ref([false]);
  let uploadedVideos = ref([null]);
  
  function validateFile(file) {
    const allowedFileTypes = ['video/mp4'];
    if (!allowedFileTypes.includes(file.type)) {
      alert('Invalid file type --only MP4 videos are allowed');
      return false;
    }
  
    const maxSizeInMB = 30;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert(`Exceed the maximum file size. Max. size: ${maxSizeInMB} MB`);
      return false;
    }
  
    return true;
  }
  
  async function uploadVideo(e, index) {
    const file = e.target.files[0];
    if (!file) return;
  
    if (validateFile(file)) {
      const formData = new FormData();
      formData.append('video', file);
  
      uploading.value[index] = true;
  
      try {
        const response = await useFetch(runtimeConfig.public.apiBase + 'videos/videoupload', {
          method: "post",
          body: formData,
          headers: {
            "Authorization": "Bearer " + user?.accessToken
          }
        });
        uploadedVideos.value[index] = response.data.value.video;
        uploading.value[index] = false;
      } catch (error) {
        console.error('Error uploading video:', error);
        uploading.value[index] = false;
      }
    } else {
      alert('Error! Only MP4 videos are allowed. Maximum allowed size is 30MB.');
    }
  }
  
  function removeVideo(index) {
    uploadedVideos.value.splice(index, 1);
    uploading.value.splice(index, 1);
  }
  
  function addVideoUploadField() {
    uploadedVideos.value.push(null);
    uploading.value.push(false);
  }
  </script>
  
  <style scoped>
  .upload-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .video-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
  }
  
  .video-preview video {
    width: 320px;
    height: 240px;
    object-fit: cover;
  }
  
  .upload-controls {
    text-align: center;
    margin-top: 10px;
  }
  </style>