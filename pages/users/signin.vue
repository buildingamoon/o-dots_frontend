<template>
  <div>
    <main class="register">
      <section class="login">
        <div class="container">
          <div class="regformuouter">
            <div class="regiforminner part1">
              <img src="/public/picture/logonobg.png">
              <div class="alert alert-primary regiforminner" role="alert">
                <br><br>
              </div>
            </div>
            <div class="part2">
              <h1>Sign In</h1>
            </div>
            <div class="regiforminner part3">
              <div class="form-group">
                <label>E-mail：</label>
                <input v-model="email" type="email" class="form-control">
              </div>
              <div class="regiforminner form-group">
                <label>Password：</label>
                <input v-model="password" type="password" class="form-control">
              </div>
              <p class="joinus">New to O-dots? <a href="/users/register">JOIN US!</a></p>
              <small><a href="/users/forgotpassword">forgot password?</a></small><br>
              <button @click.prevent="signin" type="submit" class="loginbtn btn-primary">Sign In</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRuntimeConfig } from '#imports';

const email = ref('');
const password = ref('');
const runtimeConfig = useRuntimeConfig();
const router = useRouter();

const signin = async () => {
  try {
    const apiUrl = runtimeConfig.public.apiBase + 'auth/login';
    console.log('API URL:', apiUrl);  // Debug line to check the API URL
    const response = await $fetch(apiUrl, {
      method: "post",
      body: {
        email: email.value,
        password: password.value
      }
    });

    console.log('API Response:', response);  // Debug line to check the API response

    if (response) {
      alert('Login success!');
      useSetSession(response);

      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      const targetUrl = localStorage.getItem('targetUrl');
      if (targetUrl) {
        router.push(targetUrl);
        localStorage.removeItem('targetUrl');
      } else {
        router.push("/");
      }
    } else {
      alert('Login failed. Please try again.');
    }
  } catch (err) {
    console.error('Error during sign-in:', err);
    alert('An unexpected error occurred. Please try again later.');
  }
};

</script>
