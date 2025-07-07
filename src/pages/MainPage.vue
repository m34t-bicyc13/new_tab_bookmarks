<template>
  <div class="_main_container">
    <SearchComponent />
  </div>
</template>

<script setup lang="ts">
import SearchComponent from "../components/SearchComponent.vue";
</script>

<style scoped>
._main_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
