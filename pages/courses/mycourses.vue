<template>
  <div>
    <Courseheader />
    <div id="mycourses">
      <div class="coursewrapper">
        <div class="coursecol left">
          <div class="image-preview">
            <img :src="userIcon" @click="openFileDialog" class="mycourseusericon" alt="User Icon" style="cursor: pointer;" />
            <input type="file" ref="fileInput" @change="onFileChange" style="display:none;">
          </div>
          <br>
          <p>{{ user.name }}</p>
          <div class="upload-controls">
            <label :for="'uploadUserIcon'">
            </label>
            <p v-if='uploadingUserIcon'>Uploading...</p>
          </div>
        </div>
        <div class="coursecol middle">
          <div class="box box1" style="background-image:url(/picture/demo3.jpg); background-size: cover;">
            <div class="overlay">
              <p>Course Code</p>
              <p>Title</p>
            </div>
          </div>
          <div class="box box2"></div>
          <div class="box box3"></div>
          <div class="box box4"></div>
          <div class="box box5"></div>
          <div class="box box6"></div>
        </div>
        <div class="coursecol right">
          <label>Info from Tutor</label>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat nobis voluptatem suscipit, qui voluptates doloribus! Labore quasi, maiores maxime nam quos asperiores illo? Ipsum amet accusamus illum explicabo perferendis ad.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
        middleware:["auth"]
    })

import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from '#imports';
import { useRouter } from 'vue-router';

const user = ref({ name: '' });
const userIcon = ref('/public/picture/inner.jpg');
const uploadingUserIcon = ref(false);
const fileInput = ref(null);
const router = useRouter();
const runtimeConfig = useRuntimeConfig();

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${runtimeConfig.public.apiBase}auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    user.value = data.user;
    if (data.user.userIcon) {
      userIcon.value = data.user.userIcon;
    }
    console.log('Fetched user icon:', userIcon.value);
  } catch (error) {
    console.error('Error fetching user data:', error);
    router.push('/users/signin');
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${runtimeConfig.public.apiBase}courses/imageupload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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

const saveUserIcon = async (icon) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${runtimeConfig.public.apiBase}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userIcon: icon }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    console.log('Saved user icon:', icon);
  } catch (error) {
    console.error('Error saving user icon:', error);
  }
};

const openFileDialog = () => {
  fileInput.value.click();
};

const validateFile = (file) => {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedFileTypes.includes(file.type)) {
    alert('Invalid file type. Only JPEG, PNG, and GIF images are allowed.');
    return false;
  }

  const maxSizeInMB = 2;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    alert(`File size exceeds the maximum limit of ${maxSizeInMB} MB.`);
    return false;
  }

  return true;
};

const onFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (validateFile(file)) {
    uploadingUserIcon.value = true;
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      userIcon.value = imageUrl;
      await saveUserIcon(imageUrl);
    }
    uploadingUserIcon.value = false;
  }
};

const changeIcon = async (icon) => {
  userIcon.value = icon;
  uploadingUserIcon.value = true;
  await saveUserIcon(icon);
  uploadingUserIcon.value = false;
};

onMounted(async () => {
  await fetchUserData();
});
</script>

<style scoped>
.mycourseusericon{
  width:250px;
  height:250px;
}
.coursewrapper .coursecol.left img {
  cursor: pointer;
}
.default-icons img {
  width: 50px;
  height: 50px;
  margin: 5px;
  cursor: pointer;
}
.coursewrapper {
  display: flex;
}
.coursecol.left {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.coursecol.middle {
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 100%;
  height: 100px;
  margin: 5px;
  position: relative;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.coursecol.right {
  padding: 10px;
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
@media (max-width: 600px) {
.app {
    overflow: hidden; /* Hide scrollbars */
}
.coursewrapper{
  flex-direction: column;
}
.coursecol.left{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin-top: 11vh;
}
.coursecol.middle{
    display: flex;
    flex-wrap: wrap;
    flex:4;
}
.mycourseusericon{
  width:25vh;
  height:25vh;
}
.image-preview img{
  width:10vh;
  height:10vh;
}
.coursecol.middle{
  margin-top:0;
  flex-direction: row;
}

}
</style>
