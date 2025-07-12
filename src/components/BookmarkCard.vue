<template>
  <NCard class="_bookmark_wrapper" :key="bookmark.id">
    <NA class="_bookmark_card" :href="bookmark.url" rel="noopener noreferrer">
      <NImage
        class="_bookmark_icon"
        :src="bookmark.iconUrl || getFaviconUrl(String(bookmark.url))"
        alt="favicon"
        width="20"
        height="20"
        lazy
      />
      <NH3>{{ bookmark.title }}</NH3>
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
  </NCard>
</template>

<script setup lang="ts">
import { NA, NButton, NCard, NH3, NImage } from "naive-ui";
import type { BookmarkTreeNode } from "../types/commonTypes";
import { getFaviconUrl } from "../utils/commonUtils";

defineProps<{
  bookmark: BookmarkTreeNode;
  editMode?: boolean;
  handleEditClick: Function;
}>();
</script>

<style scoped></style>
