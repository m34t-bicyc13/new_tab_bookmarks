<template>
  <div class="_main_container">
    <Search />
    <BookmarksContainer />
  </div>
</template>

<script setup lang="ts">
import Search from "../components/Search.vue";
import BookmarksContainer from "../components/BookmarksContainer.vue";
</script>

<style scoped>
._main_container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  gap: 50px;
}
</style>
