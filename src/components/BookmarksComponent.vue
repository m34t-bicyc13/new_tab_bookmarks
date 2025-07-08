<template>
  <div class="_bookmarks_container">
    <div v-if="bookmarksData">
      <h2>Ваши закладки:</h2>
      <pre>{{ bookmarksData }}</pre>
    </div>
    <div v-else-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div v-else>Загрузка закладок...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface BookmarkTreeNode {
  id: string;
  parentId?: string;
  index?: number;
  url?: string;
  title: string;
  dateAdded?: number;
  dateGroupModified?: number;
  children?: BookmarkTreeNode[];
}

const bookmarksData = ref<BookmarkTreeNode[] | null>(null);
const errorMessage = ref("");

onMounted(() => {
  chrome.runtime.sendMessage(
    { action: "getBookmarks" },
    (response: { data?: string }) => {
      if (response && response.data) {
        try {
          const bookmarks: BookmarkTreeNode[] = JSON.parse(response.data);
          console.log("Закладки успешно получены:", bookmarks);
          bookmarksData.value = bookmarks;
        } catch (error) {
          console.error("Ошибка при парсинге закладок:", error);
          errorMessage.value = "Ошибка при парсинге данных.";
        }
      } else {
        console.error("Не удалось получить закладки:", response);
        errorMessage.value = "Не удалось получить закладки.";
      }
    }
  );
});
</script>
