<template>
    <div>
      <input type="text" v-model="keyword" @input="search" placeholder="Search..." />
      <ul>
        <li v-for="item in results" :key="item._id">
          {{ item.title }}: {{ item.content }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        keyword: '',
        results: [],
      };
    },
    methods: {
      async search() {
        if (this.keyword.trim() === '') {
          this.results = [];
          return;
        }
        try {
          const params = new URLSearchParams({
            keyword: this.keyword
          });
          const response = await fetch(`/search?${params.toString()}`);
          const data = await response.json();
          this.results = data;
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      },
    },
  };
  </script>
  