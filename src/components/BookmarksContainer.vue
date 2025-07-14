<template>
  <div v-if="bookmarksData" class="_bookmarks_container">
    <BookmarkNode
      v-for="node in bookmarksData"
      :key="node.id"
      :node="node"
      targetTitle="Dashboard"
      :editMode="editMode"
      @edit-bookmark="openEditModal"
    />

    <div class="_edit_mode_control">
      <NButton
        @click="toggleEditMode"
        :type="editMode ? 'warning' : 'primary'"
        circle
        >✎</NButton
      >
    </div>
    <EditBookmarkModal
      :bookmark="editingBookmark"
      :show="showEditModal"
      @update:show="showEditModal = $event"
      @save="handleSaveBookmark"
      @cancel="showEditModal = false"
    />
  </div>

  <NAlert v-else-if="errorMessage" type="error">
    {{ errorMessage }}
  </NAlert>

  <NSpin v-else></NSpin>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NSpin, NAlert, NButton } from "naive-ui";
import BookmarkNode from "./BookmarkNode.vue";
import EditBookmarkModal from "./EditBookmarkModal.vue";
import type { BookmarkEdit } from "../types/commonTypes";
import { useBookmarks } from "../composables/useBookmarks";

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
  saveBookmark(bookmark);
  showEditModal.value = false;
};
</script>

<style scoped>
._bookmarks_container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

._edit_mode_control {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 20px;
}

._edit_mode_control button {
  transform: scaleX(-1);
}
</style>
