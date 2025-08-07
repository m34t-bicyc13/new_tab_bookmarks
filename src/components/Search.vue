<template>
  <div class="_search_container">
    <NText class="_search_title">Google</NText>
    <NInput
      class="_search_input"
      placeholder="Поиск в Google..."
      size="large"
      round
      v-model:value="searchQuery"
      @keyup.enter="performSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NInput, NText } from "naive-ui";

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
  gap: 15px;
}

._search_title {
  font-size: 100px;
  line-height: normal;
}

@media screen and (max-height: 900px) {
  ._search_title {
    font-size: 60px;
  }
}

._search_input {
  width: 70%;
}
</style>
