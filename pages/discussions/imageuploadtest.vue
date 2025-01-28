<template>
    <div>
      <div class="upload-container">
        <div v-for="(image, index) in uploadedImages" :key="index" class="image-preview">
          <img v-if="image" :src="image" width="250" height="250" alt="Uploaded Image"/>
          <div class="upload-controls">
            <label :for="`upload${index}`">
              <p>(Max. size: 2MB)</p>
            </label>
            <input type="file" @change="(e) => uploadImage(e, index)" :name="`upload${index}`" :id="`upload${index}`">
            <p v-if='uploading[index]'>Uploading...</p>
            <button @click="removeImage(index)">delete Photo</button>
          </div>
        </div>
      </div>
      <br>
      <button @click="addImageUploadField">Add More Photo</button>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { useRuntimeConfig, useRoute } from '#imports';
const user = getUser();

const runtimeConfig = useRuntimeConfig();
const route = useRoute();

let uploading = ref([false]);
let uploadedImages = ref([null]);

function validateFile(file) {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedFileTypes.includes(file.type)) {
    alert('Invalid file type --only JPEG、PNG and GIF images are allowed ');
    return false;
  }

  const maxSizeInMB = 2;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    alert(`Exceed the maximum file size. Max. size: ${maxSizeInMB} MB`);
    return false;
  }

  return true;
}

async function uploadImage(e, index) {
  const file = e.target.files[0];
  if (!file) return;

  if (validateFile(file)) {
    const formData = new FormData();
    formData.append('image', file);

    uploading.value[index] = true;

    try {
      const response = await useFetch(runtimeConfig.public.apiBase + 'courses/imageupload/', {
        method: "post",
        body: formData,
        headers: {
          "Authorization": "Bearer " + user?.accessToken
        }
      });
      uploadedImages.value[index] = response.data.value.url;
      uploading.value[index] = false;
    } catch (error) {
      console.error('Error uploading image:', error);
      uploading.value[index] = false;
    }
  } else {
    alert('Error! Only JPEG, PNG, and GIF images are allowed. Maximum allowed size is 2MB.');
  }
}

function removeImage(index) {
  uploadedImages.value.splice(index, 1);
  uploading.value.splice(index, 1);
}

function addImageUploadField() {
  uploadedImages.value.push(null);
  uploading.value.push(false);
}
</script>

<style scoped>
.upload-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
}

.image-preview img {
  width: 250px;
  height: 250px;
  object-fit: cover;
}

.upload-controls {
  text-align: center;
  margin-top: 10px;
}
</style>
