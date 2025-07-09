<template>
  <div class="_search_container">
    <div class="_title">Google</div>
    <NInput
      class="_search_input"
      placeholder="Поиск в Google..."
      size="large"
      v-model:value="searchQuery"
      @keyup.enter="performSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NInput } from "naive-ui";

const searchQuery = ref<string>("");

const performSearch = () => {
  if (searchQuery.value.trim() !== "") {
    const query = encodeURIComponent(searchQuery.value.trim());
    window.open(`https://www.google.com/search?q=${query}`);
  }
};
</script>

<style scoped>
._search_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

._title {
  font-size: 100px;
  color: #8b99b1;
}

._search_input {
  width: 50em;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 100px;
  font-size: 16px;
}
</style>
