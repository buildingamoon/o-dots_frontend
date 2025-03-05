<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="query"
      placeholder="Search..."
    />
    <button @click="search">Search</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const query = ref('');
const emit = defineEmits(['search']);

const search = async () => {
  try {
    const response = await fetch(`${config.public.apiBase}search?q=${query.value}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const results = await response.json();
    emit('search', results);
  } catch (error) {
    console.error('Error during search:', error);
  }
};
</script>

<style>
.search-bar {
  display: flex;
  align-items: center;
  margin: 20px;
}
.search-bar input {
  width: 80%;
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
}
.search-bar button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
