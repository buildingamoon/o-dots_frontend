<template>
  <div>
    <div class="loader">
      <div class="loaderwrap">
        <div>
          <img src="/public/picture/logobody.png" class="bodyloader">
          <img src="/public/picture/logoeyes.png" class="eyesloader">
          <div class="loaderwebsitename">O-dots!</div>
        </div>
      </div>
    </div>
    <mainheader />
    <main>
      <div v-if="currentPage === 'page1'">
        <section class="page page1 active">
              <div class="pagewrapper page1wrapper">
                  <div class="upper">
                    <video autoplay muted loop>
                          <source src="/video/full-width.mp4" type="video/mp4">
                      </video>

                  </div>
                  <div class="lower">
                      <a href="#">
                          <div class="page1loopbox box1">
                              <div class="one">
                                  <img src="/public/picture/inner.png">
                                  <br>
                                  <div class="acc">Name</div>
                              </div>
                              <div class="two">
                                  <iframe style="background-image:url(/picture/demo1.jpg); background-size: cover;"></iframe>
                              </div>
                              <div class="three">
                                  <div class="textboxcontent">123456789</div>
                                  <div class="datetag">datetag</div>
                              </div>
                          </div>
                      </a>
                      <a href="#">
                          <div class="page1loopbox box1">
                              <div class="one">
                                  <img src="/public/picture/inner.png">
                                  <br>
                                  <div class="acc">Name</div>
                              </div>
                              <div class="two">
                                  <iframe style="background-image:url(/picture/demo1.jpg); background-size: cover;"></iframe>
                              </div>
                              <div class="three">
                                  <div class="textboxcontent">123456789</div>
                                  <div class="datetag">datetag</div>
                              </div>
                          </div>
                      </a>
                      <a href="#">
                          <div class="page1loopbox box1">
                              <div class="one">
                                  <img src="/public/picture/inner.png">
                                  <br>
                                  <div class="acc">Name</div>
                              </div>
                              <div class="two">
                                  <iframe style="background-image:url(/picture/demo1.jpg); background-size: cover;"></iframe>
                              </div>
                              <div class="three">
                                  <div class="textboxcontent">123456789</div>
                                  <div class="datetag">datetag</div>
                              </div>
                          </div>
                      </a>
                      <a href="#">
                          <div class="page1loopbox box1">
                              <div class="one">
                                  <img src="/public/picture/inner.png">
                                  <br>
                                  <div class="acc">Name</div>
                              </div>
                              <div class="two">
                                  <iframe style="background-image:url(/picture/demo1.jpg); background-size: cover;"></iframe>
                              </div>
                              <div class="three">
                                  <div class="textboxcontent">123456789</div>
                                  <div class="datetag">datetag</div>
                              </div>
                          </div>
                      </a>
                  </div>
              </div>
          </section>
      </div>
      <section class="page page2">
        <div class="pagewrapper page2wrapper">
          <div class="whole">
            <div v-for="post in featuredPosts" :key="post._id" class="page2box page2box1">
              <div class="left">
                <h4>{{ formatDate(post.createdAt, 'day') }}</h4>
                <p>{{ formatDate(post.createdAt, 'monthYear') }}</p>
              </div>
              <div class="right">
                <div class="Lbox box1" :style="{ backgroundImage: 'url(' + post.photos + ')' }">
                  <h5>{{ post.title }}</h5>
                </div>
                <div class="Lbox box2">
                  <p>
                    {{ getExcerpt(post.content) }}
                    <a :href="'/posts/' + post._id">(Read More...)</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="page page3">
        <div class="pagewrapper page3wrapper">
            <div class="promotionslogan2">
                <a href="/courses/mycourses">My Courses</a>
                <a href="/courses/allcourses">All Courses in O-dots!</a>
            </div>
            <div class="page3videocontainer">
                <div class="page3cover"></div>
                  <div class="upperlayer">
                    <!-- Featured Course -->
                    <div class="coursecontainer coursecontainer1" v-if="featuredCourse">
                        <router-link :to="`/courses/${featuredCourse._id}`" class="course-link">
                            <div class="_isfeaturedcourse" :style="{ backgroundImage: `url(${featuredCourse.photos[0]})`, backgroundSize: 'cover' }">
                                <p class="courselooptitle">{{ featuredCourse.title }}</p>
                                <p class="courseloopcatagories">{{ featuredCourse.categories.join(', ') }}</p>
                            </div>
                        </router-link>
                    </div>

                    <!-- Recent Courses -->
                    <div class="coursecontainer coursecontainer2">
                        <div class="row row1" v-if="recentCourses.length">
                            <router-link v-for="course in recentCourses.slice(0, 2)" :key="course._id" :to="`/courses/${course._id}`" class="course-link">
                                <div class="box box1" :style="{ backgroundImage: `url(${course.photos[0]})`, backgroundSize: 'cover' }">
                                    <div>{{ course.title }}</div>
                                    <div v-for="category in course.categories" :key="category">
                                        {{ category }}
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="row row2" v-if="recentCourses.length">
                            <router-link v-for="course in recentCourses.slice(2, 4)" :key="course._id" :to="`/courses/${course._id}`" class="course-link">
                                <div class="box box1" :style="{ backgroundImage: `url(${course.photos[0]})`, backgroundSize: 'cover' }">
                                    <div>{{ course.title }}</div>
                                    <div v-for="category in course.categories" :key="category">
                                        {{ category }}
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>



        <section class="page page4">
              <div class="pagewrapper page4wrapper">
                  <div class="left">
                    <div class="image-preview2">
                      <img :src="userIcon" @click="openFileDialog" class="mycourseusericon" alt="User Icon" style="cursor: pointer;" />
                      <input type="file" ref="fileInput" @change="onFileChange" style="display:none;">
                    </div>
                    <input
                      v-if="isEditing"
                      type="text"
                      v-model="user.name"
                      @blur="saveUserName"
                      @keyup.enter="saveUserName"
                    />
                    <p v-else @click="isEditing = true">{{ user.name }}</p>
                    <p>{{ user.email }}</p>
                    <a v-if='!session.data?.user' href='/users/signin'>Login</a>
                      <a v-else href='/users/signout'>
                        Logout
                      </a>
                      <div class="upload-controls">
                      <label :for="'uploadUserIcon'">
                      </label>
                      <p v-if='uploadingUserIcon'>Uploading...</p>
                    </div>

                  </div>
                  <div class="middle">
                      <div class="title">
                          <h4>My Courses</h4>
                      </div>
                      <div class="loopbox">
                          <!-- Clip boxes here -->
                      </div>
                  </div>
                  <div class="right">
                      <div class="title">
                          <h4>My Clips</h4>
                      </div>
                      <div class="loopbox">
                          <!-- Course boxes here -->
                      </div>
                  </div>
              </div>
          </section>

    </main>
    <footer></footer>
  </div>
</template>

<script setup>
const session = useSession();

definePageMeta({
    middleware: ["auth"]
})

import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const runtimeConfig = useRuntimeConfig();

const currentPage = ref('page1'); // Default to Page 1
const posts = ref([]);
const featuredPosts = ref([]);
const courses = ref([]);
const featuredCourse = ref(null);
const recentCourses = ref([]);
const user = ref({ name: '' });
const userIcon = ref('/public/picture/inner.jpg');
const uploadingUserIcon = ref(false);
const fileInput = ref(null);
const router = useRouter();
const isEditing = ref(false);


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

  } catch (error) {
    console.error('Error fetching user data:', error);
    router.push('/users/signin');
  }
};

// Highlighted method for handling input change and saving
const saveUserName = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${runtimeConfig.public.apiBase}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name: user.value.name }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    isEditing.value = false;
  } catch (error) {
    console.error('Error saving user name:', error);
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

const fetchAllPosts = async () => {
  let page = 1;
  const allPosts = [];
  let totalPages;

  try {
    do {
      const data = await $fetch(`${runtimeConfig.public.apiBase}posts?page=${page}&limit=10`);
      if (data && data.posts) {
        allPosts.push(...data.posts);
        totalPages = data.totalPages;
        page++;
      } else {
        console.error('Failed to fetch posts');
        break;
      }
    } while (page <= totalPages);

    posts.value = allPosts;
    // Filter and sort the featured posts to get the most recent 4
    featuredPosts.value = allPosts
      .filter(post => post.is_featured)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const fetchAllCourses = async () => {
  let page = 1;
  const allCourses = [];
  let totalPages;

  try {
    do {
      const data = await $fetch(`${runtimeConfig.public.apiBase}courses?page=${page}&limit=10`);
      if (data && data.Courses) {
        allCourses.push(...data.Courses);
        totalPages = data.totalPages;
        page++;
      } else {
        console.error('Failed to fetch courses');
        break;
      }
    } while (page <= totalPages);

    courses.value = allCourses;
    // Filter and sort the featured courses to get the most recent ones
    featuredCourse.value = allCourses.find(course => course.is_featured) || null;
    recentCourses.value = allCourses
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

// router/index.js or where you define your routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    localStorage.setItem('targetUrl', to.fullPath);
    next('/login');
  } else {
    next();
  }
});


onMounted(() => {
  fetchAllPosts();
  fetchAllCourses();

  const loading = gsap.timeline();
  loading
    .fromTo('.loaderwrap', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
    .fromTo('.eyesloader', { autoAlpha: 0 }, { autoAlpha: 1, ease: 'power1.inOut', duration: 0.2 })
    .fromTo('.eyesloader', { autoAlpha: 0 }, { autoAlpha: 1, ease: 'power2.inOut', duration: 0.7 })
    .to('.loader', { y: '-100%', duration: 0.5 })
    .fromTo(
      ['header', '.page1'],
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 1,
        onComplete: () => {
          document.querySelectorAll('.page').forEach(page => {
            if (!page.classList.contains('page1')) page.classList.remove('active');
          });
        },
      }
    );
  document.querySelectorAll('.secondnav a, #nav a').forEach(link => {
    link.addEventListener('click', event => handleClick(event, link.dataset.target));
  });
});

const handleClick = (event, targetPage) => {
  const dynamicPages = ['page1', 'page2', 'page3', 'page4'];

  if (dynamicPages.includes(targetPage)) {
    event.preventDefault();

    if (targetPage === 'page4') {
      const userData = getUser();
      if (!userData || !userData.user) {
        window.location.pathname = "/users/signin";
        return;
      }
    }

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.classList.remove('active');
      page.style.visibility = 'hidden';
      page.style.opacity = '0';
    });

    const targetElement = document.querySelector(`.${targetPage}`);
    if (targetElement) {
      targetElement.classList.add('active');
      targetElement.style.visibility = 'visible';
      targetElement.style.opacity = '1';

    } else {
      console.error(`No element found for the class: ${targetPage}`);
    }
  }
};
</script>

<style>
h5{
  background: rgb(255 255 255 / 30%);
    font-size: 0.25em;
    bottom: 27%;
}
.page1wrapper .lower .one{
  flex:1;
  display:flex;
  flex-direction: row;
  margin:1vh;
  align-content: flex-end;
  align-items: end;
}
.page1wrapper .lower img{
  width:5vh;
  height:5vh;
  border-radius: 50%;
  margin: 1vh 1vh;
}
.page1wrapper .lower .two iframe{

  border: black;
}
@media (max-width: 600px) {
  .page2wrapper {
      margin-top: 13vh;
  }
  .page2 .whole {
        width: 100%;
        flex-direction: column;
        margin-top: 80vh;
        margin-bottom: 10vh;
    }
  .page3cover .upperlayer{
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
  }
  ._isfeaturedcourse{
    margin-left:0;
    margin-top: 2vh;
    width:90%;
  }
  .row .box{
    width:20vh;
    height:20vh;
   
}
 .coursecontainer2{
  margin-top: 0px;
 }
 .upperlayer .coursecontainer .row {
    display: flex;
    flex: 1 1 calc(50%-1vh);
    flex-direction: column;
    margin: 0 .5vh;
    row-gap: 2vh;
    margin: 2vh;
}
.page4wrapper .middle,.page4wrapper .right{
    align-self: center;    
    margin-top:1vh;
}
.page1wrapper .upper {
    flex: 0.3;
    width: 100%;
    overflow-y: auto;
}
.coursecontainer1 a {
    color: #000;
    text-decoration: none;
    width: 80%;
    height: 100%;
    margin-top: 8vh;
}
.page2box {
    flex:none;
  }
  .page2wrapper .whole {
    padding-top: 30vh;

  }
  .page1wrapper .lower {
  flex: 1.5;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  gap: 1vh;
  position: relative;
  background-color: #00000017;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: row;
}
.page1wrapper .lower .one{
  flex:1;
  display:flex;
  flex-direction: row;

  align-content: flex-end;
  align-items: center;
}
.page1wrapper .lower .one img{
  background: white;
  width:8vh;
  height: 8vh;
  border-radius: 50%;
  
}
.page1wrapper .lower .one .acc{
  color: white;
  padding-left:1vh;
}
.page1wrapper .lower .two{
  flex:7;
  display:flex;
  position:relative;
  overflow:hidden;
  width:100%;
  height:100%;
}
.page1wrapper .lower .two iframe{
  height:100%;
  width:100%;
  overflow:hidden;
  position: relative;
  border: black;
}


.page1wrapper .lower .three{
  margin-top:1vh;
  flex:2;
  display:flex;
  flex-direction: column;
  text-align: left;
  margin-left:1vh;
}
.page1wrapper .lower .three .datetag{
  font-size: 0.8em;
}
.page1wrapper .lower a{
  width: 100%;
  height: 565px;
  margin-top: 10vh;
}
.page1loopbox {
  margin-top: 915px;
}
.image-preview2 {
  display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
}
}
</style>













