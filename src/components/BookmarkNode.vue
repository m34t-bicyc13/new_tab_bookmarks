<template>
  <div v-if="isTargetFolder" class="_folder">
    <div class="_folder_title">{{ node.title }}</div>

    <!-- Сначала отрисовываем ссылки -->
    <div v-if="bookmarks.length" class="_bookmark_grid">
      <BookmarkCard
        v-for="bookmark in bookmarks"
        :bookmark="bookmark"
        :editMode="editMode"
        :handleEditClick="handleEditClick"
      />
    </div>

    <!-- Затем вложенные папки -->
    <BookmarkNode
      v-for="child in folders"
      :key="child.id"
      :node="child"
      :editMode="editMode"
      @edit-bookmark="$emit('edit-bookmark', $event)"
    />
  </div>
  <!-- Продолжаем рекурсивный поиск -->
  <BookmarkNode
    v-else-if="folders.length"
    v-for="child in folders"
    :key="child.id"
    :node="child"
    :targetTitle="targetTitle"
    :editMode="editMode"
    @edit-bookmark="$emit('edit-bookmark', $event)"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { BookmarkTreeNode } from "../types/commonTypes";
import BookmarkCard from "./BookmarkCard.vue";

const props = defineProps<{
  node: BookmarkTreeNode;
  targetTitle?: string;
  editMode?: boolean;
}>();

const emit = defineEmits(["edit-bookmark"]);

const isTargetFolder = computed(() =>
  props.targetTitle ? props.node.title === props.targetTitle : true
);

const bookmarks = computed(
  () => props.node.children?.filter((n: BookmarkTreeNode) => n.url) ?? []
);

const folders = computed(
  () => props.node.children?.filter((n: BookmarkTreeNode) => !n.url) ?? []
);

const handleEditClick = (bookmark: BookmarkTreeNode) => {
  emit("edit-bookmark", {
    id: bookmark.id,
    title: bookmark.title || "",
    url: bookmark.url || "",
    iconUrl: bookmark.iconUrl || "",
  });
};
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


</style>
