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
  const { data, error } = await useFetch(runtimeConfig.public.apiBase + 'auth/login', {
    method: "post",
    body: {
      email: email.value,
      password: password.value
    }
  });

  if (data.value) {
    alert('Login success!');
    useSetSession(data.value);

    // Store tokens in localStorage
    localStorage.setItem('token', data.value.accessToken); // Store access token
    localStorage.setItem('refreshToken', data.value.refreshToken); // Store refresh token

    // Retrieve the target URL from localStorage
    const targetUrl = localStorage.getItem('targetUrl');
    if (targetUrl) {
      // Redirect to the target URL
      router.push(targetUrl);
      // Clear the stored target URL
      localStorage.removeItem('targetUrl');
    } else {
      // Default to home page
      router.push("/");
    }
  } else if (error.value) {
    alert(error.value.data.message);
  }
};
</script>
