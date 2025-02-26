<template>
  <div>
    <h1>Add a New Course</h1>
    <form @submit.prevent="submitCourse">
      <div>
        <cleanheader />
        <label for="title">Course Title:</label>
        <input type="text" id="title" v-model="course.title" required>
      </div>
      <div>
        <label for="promotionUrl">Promotion Embed Link:</label>
        <textarea id="promotionUrl" v-model="course.promotionUrl" @blur="extractPromotionSrc"></textarea>
      </div>
      <div>
        <label for="categories">Categories:</label>
        <input type="text" id="categories" v-model="categoriesInput" @blur="addCategory">
        <ul>
          <li v-for="(category, index) in course.categories" :key="index">
            {{ category }} <button type="button" @click="removeCategory(index)">Remove</button>
          </li>
        </ul>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="course.description" required></textarea>
      </div>
      <div>
        <label for="photos">Photo URL:</label>
        <div class="image-preview">
          <img :src="photoPreview || '/path/to/default-image.jpg'" @click="openFileDialog" width="250" height="250" alt="Course Photo" style="cursor: pointer;" />
          <input type="file" ref="fileInput" @change="onFileChange" style="display:none;">
          <div class="upload-controls">
            <p v-if="uploading">Uploading...</p>
            <button type="button" @click="removePhoto" v-if="photoPreview">Remove Photo</button>
          </div>
        </div>
      </div>
      <div>
        <label for="Price">Price (in $):</label>
        <input type="number" id="Price" v-model="course.Price">
      </div>
      <div>
        <label>Videos:</label>
        <div v-for="(video, index) in course.videos" :key="index">
          <input type="text" placeholder="Video Name" v-model="video.name" required>
          <input type="text" placeholder="Video Embed Link" v-model="video.url" required @blur="extractVideoSrc(index)">
          <input type="text" placeholder="Tutor Remarks" v-model="video.tutorremarks">
          <button type="button" @click="removeVideo(index)">Remove Video</button>
        </div>
        <button type="button" @click="addVideo">Add Video</button>
      </div>
      <button type="submit">Save Course</button>
    </form>
  </div>
</template>


<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from '#imports';

const course = ref({
  title: '',
  promotionUrl: '',
  categories: [],
  description: '',
  photos: '',
  Price: null,
  videos: [],
  tutor: '' // Will be set dynamically
});

const categoriesInput = ref('');
const photoPreview = ref(null);
const uploading = ref(false);
const fileInput = ref(null);

const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const user = getUser(); // Fetch the current user

const extractSrc = (embedLink) => {
  const match = embedLink.match(/src\s*=\s*"([^"]+)"/);
  return match ? match[1] : embedLink;
};

const extractPromotionSrc = () => {
  course.value.promotionUrl = extractSrc(course.value.promotionUrl);
};

const extractVideoSrc = (index) => {
  course.value.videos[index].url = extractSrc(course.value.videos[index].url);
};

const addCategory = () => {
  if (categoriesInput.value && !course.value.categories.includes(categoriesInput.value)) {
    course.value.categories.push(categoriesInput.value);
    categoriesInput.value = '';
  }
};

const removeCategory = (index) => {
  course.value.categories.splice(index, 1);
};

const removePhoto = () => {
  course.value.photos = '';
  photoPreview.value = null;
};

const validateFile = (file) => {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedFileTypes.includes(file.type)) {
    alert('Invalid file type -- only JPEG, PNG, and GIF images are allowed');
    return false;
  }

  const maxSizeInMB = 2;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    alert(`Exceed the maximum file size. Max. size: ${maxSizeInMB} MB`);
    return false;
  }

  return true;
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('http://localhost:1337/api/courses/imageupload', {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": "Bearer " + user?.accessToken
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

const onFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (validateFile(file)) {
    uploading.value = true;
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      course.value.photos = imageUrl;
      photoPreview.value = imageUrl;
    }
    uploading.value = false;
  }
};

const openFileDialog = () => {
  fileInput.value.click();
};

const addVideo = () => {
  course.value.videos.push({ name: '', url: '', tutorremarks: '' });
};

const removeVideo = (index) => {
  course.value.videos.splice(index, 1);
};

const getTutorId = () => {
  // Replace with actual logic to fetch logged-in user's ID
  return '606c6f5c8e2e2b0728fcbfc9'; // Example valid ObjectId
};

const submitCourse = async () => {
  course.value.tutor = getTutorId(); // Set the valid tutor ID

  try {
    console.log('Submitting course:', course.value); // Log course data
    const response = await fetch(`${runtimeConfig.public.apiBase}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + user?.accessToken
      },
      body: JSON.stringify({
        ...course.value,
        Price: course.value.Price * 100 // Convert price to smallest currency unit (cents)
      })
    });
    if (!response.ok) {
      throw new Error('Failed to add course');
    }
    const data = await response.json();
    console.log('Course added:', data); // Log response
    await nextTick(); // Ensure DOM is updated
    router.push(`/courses/${data._id}`);
  } catch (error) {
    console.error('Error adding course:', error); // Log error
  }
};

// Reload data when component is mounted
const reloadData = async () => {
  await fetchCourse();
};

onMounted(() => {
  nextTick().then(() => {
    reloadData();
  });
});
</script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
}
form div {
  margin-bottom: 10px;
}
form label {
  font-weight: bold;
}
form input, form textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
form button {
  padding: 10px 20px;
  margin-top: 10px;
}
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
  cursor: pointer;
}
.upload-controls {
  text-align: center;
  margin-top: 10px;
}
</style>
