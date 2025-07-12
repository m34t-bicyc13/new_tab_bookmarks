<template>
  <NCard v-if="bookmarksData" class="_bookmarks_container">
    <NCard class="_edit_mode_control">
      <NButton @click="toggleEditMode" type="primary" circle>✎</NButton>
    </NCard>

    <BookmarkNode
      v-for="node in bookmarksData"
      :key="node.id"
      :node="node"
      targetTitle="Dashboard"
      :editMode="editMode"
      @edit-bookmark="openEditModal"
    />

    <EditBookmarkModal
      :bookmark="editingBookmark"
      :show="showEditModal"
      @update:show="showEditModal = $event"
      @save="handleSaveBookmark"
      @cancel="showEditModal = false"
    />
  </NCard>

  <NAlert v-else-if="errorMessage" type="error">
    {{ errorMessage }}
  </NAlert>

  <NSpin v-else></NSpin>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NSpin, NAlert, NButton, NCard } from "naive-ui";
import BookmarkNode from "./BookmarkNode.vue";
import EditBookmarkModal from "./EditBookmarkModal.vue";
import type { BookmarkTreeNode, BookmarkEdit } from "../types/commonTypes";
import { useBookmarks } from "../utils/useBookmarks";

const { bookmarksData, errorMessage, saveBookmark } = useBookmarks();

const editMode = ref(false);
const showEditModal = ref(false);
const editingBookmark = ref<BookmarkEdit>({
  id: "",
  title: "",
  url: "",
  iconUrl: "",
});

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const openEditModal = (bookmark: BookmarkEdit) => {
  editingBookmark.value = { ...bookmark };
  showEditModal.value = true;
};

const handleSaveBookmark = (bookmark: BookmarkEdit) => {
  saveBookmark(bookmark, (updatedNode) => {
    updateBookmarkInTree(bookmarksData.value, updatedNode);
    showEditModal.value = false;
  });
};

const updateBookmarkInTree = (
  nodes: BookmarkTreeNode[] | null,
  updatedNode: BookmarkTreeNode
) => {
  if (!nodes) return;

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === updatedNode.id) {
      nodes[i] = { ...updatedNode };
      return;
    }
    if (nodes[i].children) {
      updateBookmarkInTree(nodes[i].children || null, updatedNode);
    }
  }
};
</script>

<style scoped></style>
