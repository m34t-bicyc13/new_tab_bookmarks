<template>
  <NCard v-if="isTargetFolder" class="_folder">
    <NH2 class="_folder_title">{{ node.title }}</NH2>

    <!-- Сначала отрисовываем ссылки -->
    <NCard v-if="bookmarks.length" class="_bookmark_grid">
      <BookmarkCard
        v-for="bookmark in bookmarks"
        :bookmark="bookmark"
        :editMode="editMode"
        :handleEditClick="handleEditClick"
      />
    </NCard>

    <!-- Затем вложенные папки -->
    <BookmarkNode
      v-for="child in folders"
      :key="child.id"
      :node="child"
      :editMode="editMode"
      @edit-bookmark="$emit('edit-bookmark', $event)"
    />
  </NCard>
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
import { NCard, NH2 } from "naive-ui";

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

<style scoped></style>
