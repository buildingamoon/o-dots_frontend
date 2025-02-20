<template>
  <courseheader/>
  <div class="coursedetailswhole">
    <div class="addedlayer" v-if="course">
      <div class="course-container">
        <div class="course-left">
          <div v-if="course.promotionUrl" class="mediawrapper">
            <iframe :src="`${course.promotionUrl}?autoplay=1`" width="100%" height="100%" frameborder="0" allow="autoplay" allowfullscreen muted></iframe>
          </div>
          <div v-else class="mediawrapper">
            <img :src="course.photos[0]" alt="Course Photo" width="100%" height="100%" />
          </div>
          <h3>Course Title: {{ course.title }}</h3>
          <div class="course-info">
            <div class="tutor">Tutor: {{ course.tutor }}</div>
            <div class="categories">
              <span v-for="category in course.categories" :key="category" class="category">
                {{ category }}
              </span>
            </div>
          </div>
          <div>
            <br>
            <p>Course Description</p>
            <div class="coursedescription">
              <p>{{ course.description }}</p>
            </div>
          </div>
        </div>
        <div class="course-right">
          <div v-if="course.photos.length" v-for="photo in course.photos" :key="photo">
            <img :src="photo" alt="Course Photo" class="course-photo">
          </div>
          <div v-if="course.Price !== null && course.Price !== 0">
            <h3>Price: ${{ formatPrice(course.Price) }}</h3>
            <button @click="redirectToStripe">Proceed to Payment</button>
          </div>
          <div v-else>
            <button @click="watchItNow">Watch it now</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Course not found</h2>
      <p>We couldn't find the course you're looking for. Please check the URL or try again later.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loadStripe } from '@stripe/stripe-js';

const runtimeConfig = useRuntimeConfig();
const getCurrentUserId = () => {
  // 实现获取当前用户ID的逻辑
  // 假设用户ID保存在本地存储中
  return localStorage.getItem('userId');
};

const redirectToStripe = async () => {
  try {
    const customerId = getCurrentUserId();
    const response = await fetch(`${runtimeConfig.public.apiBase}/payments/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productName: course.value.title,
        price: course.value.Price,
        quantity: 1,
        successUrl: "https://o-dots.com/payments/success?session_id={CHECKOUT_SESSION_ID}",
        failUrl: "https://o-dots.com/payments/fail",
        customer: customerId
      })
    });

    const data = await response.json();

    if (!data.id) {
      throw new Error('No session ID returned from API');
    }

    const stripe = await loadStripe(runtimeConfig.public.stripePubishKey);
    await stripe.redirectToCheckout({ sessionId: data.id });
  } catch (error) {
    console.error('Error redirecting to Stripe:', error);
  }
};

const watchItNow = () => {
  router.push(`/courses/${course.value._id}/watch`);
};

const course = ref(null);
const route = useRoute();
const router = useRouter();

const fetchCourse = async () => {
  const courseId = route.params.id;

  try {
    const response = await fetch(`${runtimeConfig.public.apiBase}courses/${courseId}`);
    if (!response.ok) {
      throw new Error(`Error fetching course details: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    course.value = data;
  } catch (error) {
    console.error('Error fetching course details:', error);
    course.value = null;
  }
};

onMounted(async () => {
  await fetchCourse();
});
</script>

<style scoped>
.coursedetailswhole {
  display: flex;
  background-color: black;
  margin-top: 17vh;
  padding: 0px 5%;
  width: 100%;
}
.course-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  border: 1px dotted white;
  color: white;
  flex-direction: row;
  width: 100%;
}
.course-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-sizing: border-box;
  padding: 1em;
  border: 1px dotted white;
  width: 50%;
}
.coursedescription {
  padding: 4px;
  border: 1px dotted white;
  font-size: 1em;
  max-height: 45%;
  position: relative;
  overflow-y: auto;
  margin: 5px 0%;
}
.course-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border: 1px dotted white;
  justify-content: flex-start;
  padding-top: 5%;
  text-align: center;
}
.course-details {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  font-size: 1em;
}
.course-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.course-photo {
  max-width: 50%;
  height: auto;
}
.mediawrapper {
  margin-top: 10px;
  aspect-ratio: 16/9;
  width: 100%;
  overflow: hidden;
  border: 1px solid #ddd;
}
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.category {
  padding: 2px 8px;
  background-color: rgba(237, 48, 48, 0.6);
  border-radius: 1em;
  font-size: 0.8em;
}
button {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
.addedlayer {
  width: 85%;
}
</style>