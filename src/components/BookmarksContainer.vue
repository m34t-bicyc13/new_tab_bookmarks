<template>
  <div v-if="bookmarksData" class="_bookmarks_container">
    <BookmarkNode v-for="node in bookmarksData" :key="node.id" :node="node" />
  </div>

  <n-alert v-else-if="errorMessage" type="error">
    {{ errorMessage }}
  </n-alert>

  <n-spin v-else></n-spin>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NSpin, NAlert } from "naive-ui";
import BookmarkNode from "./BookmarkNode.vue";
import type { BookmarkTreeNode } from "../types/commonTypes";

const bookmarksData = ref<BookmarkTreeNode[] | null>(null);
const errorMessage = ref("");

onMounted(() => {
  chrome.runtime.sendMessage({ action: "getBookmarks" }, (response) => {
    if (response?.data) {
      try {
        const bookmarks: BookmarkTreeNode[] = JSON.parse(response.data);
        bookmarksData.value = bookmarks;
      } catch (e) {
        errorMessage.value = "Ошибка при парсинге данных.";
      }
    } else {
      errorMessage.value = "Не удалось получить закладки.";
    }
  });
});
</script>