<template>
  <div>
    <SearchBar @search="performSearch" />
    <div v-if="filteredResults.length">
      <div v-for="item in filteredResults" :key="item.id" class="search-result">
        <h2>{{ item.title }}</h2>
        <p>{{ item.content }}</p>
      </div>
    </div>
    <div v-else>
      <p>No results found</p>
    </div>
  </div>
</template>

<script>
import SearchBar from '~/components/Searchbar.vue';

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      filteredResults: [],
    };
  },
  methods: {
    performSearch(results) {
      this.filteredResults = results;
    },
  },
};
</script>

<style>
.search-result {
  margin: 10px 0;
}
</style>
