<template>
  <div>
    <input type="text" v-model="keyword" placeholder="Search..." />
    <button @click="search">Search</button>
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
        const response = await fetch(`${runtimeConfig.public.apiBase}/search?${params.toString()}`);
        const data = await response.json();
        this.results = data;
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    },
  },
};
</script>

<style scoped>
input {
  padding: 8px;
  margin-right: 8px;
}
button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
ul {
  margin-top: 16px;
}
li {
  margin-bottom: 8px;
}
</style>
