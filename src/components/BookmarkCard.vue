<template>
  <div class="_bookmark_wrapper" :key="bookmark.id">
    <NA class="_bookmark_card" :href="bookmark.url" rel="noopener noreferrer">
      <NImage
        class="_bookmark_icon"
        :src="bookmark.iconUrl || getFaviconUrl(String(bookmark.url))"
        alt="favicon"
        width="20"
        height="20"
        lazy
      />
      <NText class="_bookmark_title">{{ bookmark.title }}</NText>
    </NA>
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
import { NA, NButton, NText, NImage } from "naive-ui";
import type { BookmarkTreeNode } from "../types/commonTypes";
import { getFaviconUrl } from "../utils/urlUtils";

defineProps<{
  bookmark: BookmarkTreeNode;
  editMode?: boolean;
  handleEditClick: Function;
}>();
</script>

<style scoped>
._bookmark_wrapper {
  position: relative;
}

._bookmark_card {
  display: flex;
  gap: 10px;
  align-items: center;
  width: max-content;
  padding: 10px;
  background-color: var(--n-color-modal);
  border-radius: var(--n-border-radius);
  text-decoration: none;
}

._bookmark_card:hover {
  background-color: #63e2b72e;
}

._bookmark_icon {
  background-color: var(--n-color-popover);
  padding: 2px;
  border-radius: 7px;
}

._bookmark_title {
  font-size: 16px;
}

._bookmark_edit_button {
  position: absolute;
  bottom: 0;
  right: -8px;
  transform: scaleX(-1);
}
</style>
