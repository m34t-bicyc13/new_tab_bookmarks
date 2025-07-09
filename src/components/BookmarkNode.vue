<template>
  <div v-if="isFolder" class="_folder">
    <div class="_folder_title">{{ node.title }}</div>

    <!-- Сначала отрисовываем ссылки -->
    <div v-if="bookmarks.length" class="_bookmark_grid">
      <a
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        class="_bookmark_card"
        :href="bookmark.url"
        rel="noopener noreferrer"
      >
        {{ bookmark.title }}
      </a>
    </div>

    <!-- Затем вложенные папки -->
    <BookmarkNode v-for="child in folders" :key="child.id" :node="child" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { BookmarkTreeNode } from "../types/commonTypes";

const props = defineProps<{
  node: BookmarkTreeNode;
}>();

const isFolder = computed(() => props.node.children?.length);

const bookmarks = computed(
  () => props.node.children?.filter((n: BookmarkTreeNode) => n.url) ?? []
);

const folders = computed(
  () => props.node.children?.filter((n: BookmarkTreeNode) => !n.url) ?? []
);
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
</style>
