<template>
  <div v-if="isTargetFolder" class="_folder">
    <div class="_folder_title">{{ node.title }}</div>

    <!-- Сначала отрисовываем ссылки -->
    <div v-if="bookmarks.length" class="_bookmark_grid">
      <a
        v-for="bookmark in bookmarks"
        class="_bookmark_card"
        :key="bookmark.id"
        :href="bookmark.url"
        rel="noopener noreferrer"
      >
        <span class="_bookmark_favicon">
          <img
            :src="getFaviconUrl(String(bookmark.url))"
            alt="favicon"
            loading="lazy"
            width="20"
            height="20"
          />
        </span>
        <h3>{{ bookmark.title }}</h3>
      </a>
    </div>

    <!-- Затем вложенные папки -->
    <BookmarkNode v-for="child in folders" :key="child.id" :node="child" />
  </div>
  <!-- Продолжаем рекурсивный поиск -->
  <BookmarkNode
    v-else-if="folders.length"
    v-for="child in folders"
    :key="child.id"
    :node="child"
    :targetTitle="targetTitle"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { BookmarkTreeNode } from "../types/commonTypes";

const props = defineProps<{
  node: BookmarkTreeNode;
  targetTitle?: string;
}>();

//const isFolder = computed(() => props.node.children?.length);

const isTargetFolder = computed(() =>
  props.targetTitle ? props.node.title === props.targetTitle : true
);

const bookmarks = computed(
  () => props.node.children?.filter((n: BookmarkTreeNode) => n.url) ?? []
);

const folders = computed(
  () => props.node.children?.filter((n: BookmarkTreeNode) => !n.url) ?? []
);

// Получение favicon через Google API
function getFaviconUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
  } catch {
    return "";
  }
}
</script>

<style scoped>
._folder:first-child {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border: #455673 1px solid;
  border-radius: 30px;
  box-shadow: 0 0 15px 1px #00000045;
}

._folder {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border: #455673 1px solid;
  border-radius: 25px;
  box-shadow: 0 0 15px 1px #00000045;
}

._folder_title {
  font-size: 20px;
  font-weight: bold;
  color: #455673;
}

._bookmark_grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
}

._bookmark_card {
  display: flex;
  align-items: center;
  height: 50px;
  min-height: 50px;
  max-height: 50px;
  padding: 0 12px;
  border-radius: 20px;
  text-decoration: none;
  background-color: #2d3748;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.2s;
  gap: 12px;
  overflow: hidden;
}

._bookmark_favicon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #4a5568;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  overflow: hidden;
}

._bookmark_card:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
  background-color: #334158;
}

._bookmark_card h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  color: #a0aec0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
