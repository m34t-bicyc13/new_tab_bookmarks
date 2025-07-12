<template>
  <NCard class="_search_container">
    <NH1 class="_title">Google</NH1>
    <NInput
      class="_search_input"
      placeholder="Поиск в Google..."
      size="large"
      v-model:value="searchQuery"
      @keyup.enter="performSearch"
    />
  </NCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NInput, NH1, NCard } from "naive-ui";

const searchQuery = ref<string>("");

const performSearch = () => {
  if (searchQuery.value.trim() !== "") {
    const query = encodeURIComponent(searchQuery.value.trim());
    window.open(`https://www.google.com/search?q=${query}`);
  }
};
</script>

<style scoped></style>
