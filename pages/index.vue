<template>
  <div>
    <div class="loader">
      <div class="loaderwrap">
        <div>
          <img src="/picture/logobody.png" class="bodyloader">
          <img src="/picture/logoeyes.png" class="eyesloader">
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
                      <div class="container"></div>
                  </div>
                  <div class="lower">
                      <a href="#">
                          <div class="page1loopbox box1" style="background-image:url(/picture/demo1.jpg); background-size: cover;">
                              <p>title title title</p>
                          </div>
                      </a>
                      <a href="#">
                          <div class="page1loopbox box2">
                              <p>title title title</p>
                          </div>
                      </a>
                      <a href="#">
                          <div class="page1loopbox box3">
                              <p>title title title</p>
                          </div>
                      </a>
                      <a href="#">
                          <div class="page1loopbox box4">
                              <p>title title title</p>
                          </div>
                      </a>
                      <a href="#">
                          <div class="page1loopbox box5">
                              <p>title title title</p>
                          </div>
                      </a>
                      <a href="#">
                          <div class="page1loopbox box6">
                              <p>title title title</p>
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
                          <div class="coursecontainer coursecontainer1" v-if="featuredCourse" :style="{ backgroundImage: `url(${featuredCourse.photos[0]})` }">
                              <router-link :to="`/courses/${featuredCourse._id}`" class="course-link">
                                  <div class="_isfeaturedcourse">
                                      <p class="courselooptitle">{{ featuredCourse.title }}</p>
                                      <p class="courseloopcatagories">{{ featuredCourse.categories.join(', ') }}</p>
                                  </div>
                              </router-link>
                          </div>

                          <!-- Recent Courses -->
                          <div class="coursecontainer coursecontainer2">
                              <div class="row row1" v-if="recentCourses.length">
                                  <router-link v-for="course in recentCourses.slice(0, 2)" :key="course._id" :to="`/courses/${course._id}`" class="course-link">
                                      <div class="box box1" :style="{ backgroundImage: `url(${course.photos[0]})` }">
                                          <div>{{ course.title }}</div>
                                          <div v-for="category in course.categories" :key="category">
                                              {{ category }}
                                          </div>
                                      </div>
                                  </router-link>
                              </div>
                              <div class="row row2" v-if="recentCourses.length">
                                  <router-link v-for="course in recentCourses.slice(2, 4)" :key="course._id" :to="`/courses/${course._id}`" class="course-link">
                                      <div class="box box1" :style="{ backgroundImage: `url(${course.photos[0]})` }">
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
                      <img src="/picture/inner.png" class="usericon">
                      <p>User Name</p>
                  </div>
                  <div class="middle">
                      <div class="title">
                          <h4>My Clips</h4>
                      </div>
                      <div class="loopbox">
                          <!-- Clip boxes here -->
                      </div>
                  </div>
                  <div class="right">
                      <div class="title">
                          <h4>My Courses</h4>
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
definePageMeta({
    middleware:["auth"]
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
    console.log('All fetched posts:', posts.value); // Log all fetched posts
    console.log('Featured posts:', featuredPosts.value); // Log featured posts
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
    console.log('All fetched courses:', courses.value); // Log all fetched courses
    console.log('Featured course:', featuredCourse.value); // Log featured course
    console.log('Recent courses:', recentCourses.value); // Log recent courses
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

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
    font-size: 0.4em;
}
@media (max-width: 600px) {
  .page2wrapper {
      margin-top: 13vh;
  }
  .page2 .whole {
        width: 100%;
        flex-direction: column;
        margin-top: 27vh;
        margin-bottom: 10vh;
    }
  .page3cover .upperlayer{
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
  }
  ._isfeaturedcourse{
    margin-left:0;
  }
  .row .box{
    width:20vh;
    height:20vh;
   
}
 .coursecontainer2{
  margin-top: -203px;
 }
  
}
</style>
