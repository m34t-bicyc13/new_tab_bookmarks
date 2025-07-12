<template>
  <div class="_bookmark_wrapper" :key="bookmark.id">
    <a class="_bookmark_card" :href="bookmark.url" rel="noopener noreferrer">
      <span class="_bookmark_favicon">
        <img
          :src="bookmark.iconUrl || getFaviconUrl(String(bookmark.url))"
          alt="favicon"
          loading="lazy"
          width="20"
          height="20"
        />
      </span>
      <h3>{{ bookmark.title }}</h3>
    </a>
    <NButton
      v-if="editMode"
      class="_bookmark_edit_button"
      type="primary"
      circle
      size="tiny"
      @click="handleEditClick(bookmark)"
      >✎
    </NButton>
  </div>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import type { BookmarkTreeNode } from "../types/commonTypes";
import { getFaviconUrl } from "../utils/commonUtils";

defineProps<{
  bookmark: BookmarkTreeNode;
  editMode?: boolean;
  handleEditClick: Function;
}>();
</script>

<style scoped>
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

._bookmark_edit_button {
  position: absolute;
  bottom: 0;
  right: -5px;
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  font-size: 12px;
  transform: scaleX(-1);
}

._bookmark_wrapper {
  position: relative;
}
</style>
