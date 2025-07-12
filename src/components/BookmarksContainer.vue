<template>
  <div v-if="bookmarksData" class="_bookmarks_container">
    <div class="_edit_mode_control">
      <NButton @click="toggleEditMode" type="primary" circle>✎</NButton>
    </div>

    <BookmarkNode
      v-for="node in bookmarksData"
      :key="node.id"
      :node="node"
      targetTitle="Dashboard"
      :editMode="editMode"
      @edit-bookmark="openEditModal"
    />

    <NModal v-model:show="showEditModal">
      <NCard
        style="width: 800px"
        title="Изменение закладки"
        :bordered="false"
        role="dialog"
        aria-modal="true"
      >
        <NForm>
          <NFormItem label="Название">
            <NInput v-model:value="editingBookmark.title" placeholder="Example"/>
          </NFormItem>
          <NFormItem label="Ссылка">
            <NInput v-model:value="editingBookmark.url" placeholder="https://example.com" />
          </NFormItem>
          <NFormItem label="Иконка">
            <NInput v-model:value="editingBookmark.iconUrl" placeholder="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons@master/svg/icon_name.svg"/>
          </NFormItem>
        </NForm>

        <template #footer>
          <NSpace justify="end">
            <NButton @click="showEditModal = false">Отмена</NButton>
            <NButton type="primary" @click="saveBookmark">Сохранить</NButton>
          </NSpace>
        </template>
      </NCard>
    </NModal>
  </div>

  <NAlert v-else-if="errorMessage" type="error">
    {{ errorMessage }}
  </NAlert>

  <NSpin v-else></NSpin>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  NSpin,
  NAlert,
  NButton,
  NModal,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NSpace,
} from "naive-ui";
import BookmarkNode from "./BookmarkNode.vue";
import type { BookmarkTreeNode, BookmarkEdit } from "../types/commonTypes";
import {
  getCustomIcons,
  setCustomIcon,
  updateBookmarksWithIcons,
} from "../utils/commonUtils";

const bookmarksData = ref<BookmarkTreeNode[] | null>(null);
const errorMessage = ref("");
const editMode = ref(false);
const showEditModal = ref(false);
const customIcons = ref<{ [key: string]: string }>({});
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

const saveBookmark = () => {
  // Here you would typically send an update to chrome.bookmarks API
  chrome.bookmarks.update(
    editingBookmark.value.id,
    {
      title: editingBookmark.value.title,
      url: editingBookmark.value.url,
    },
    (updatedNode) => {
      setCustomIcon(
        editingBookmark.value.id,
        editingBookmark.value.iconUrl ?? "",
        () => {
          // Update local state
          updateBookmarkInTree(bookmarksData.value, {
            ...updatedNode,
            iconUrl: editingBookmark.value.iconUrl,
          });
          showEditModal.value = false;
        }
      );
    }
  );
};

const updateBookmarkInTree = (
  nodes: BookmarkTreeNode[] | null,
  updatedNode: BookmarkTreeNode
) => {
  if (!nodes) return;

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === updatedNode.id) {
      // Обновляем все свойства, включая icon
      nodes[i] = { ...updatedNode };
      return;
    }
    if (nodes[i].children) {
      updateBookmarkInTree(nodes[i].children || null, updatedNode);
    }
  }
};

onMounted(() => {
  // Загружаем закладки
  chrome.runtime.sendMessage({ action: "getBookmarks" }, (response) => {
    if (response?.data) {
      try {
        const bookmarks: BookmarkTreeNode[] = JSON.parse(response.data);

        // Загружаем иконки и после этого рендерим
        getCustomIcons((icons) => {
          customIcons.value = icons;
          // Обновляем иконки в bookmarksData
          updateBookmarksWithIcons(bookmarks, icons);
          bookmarksData.value = bookmarks;
        });
      } catch (e) {
        errorMessage.value = "Ошибка при парсинге данных.";
      }
    } else {
      errorMessage.value = "Не удалось получить закладки.";
    }
  });
});
</script>

<style scoped>
._edit_mode_control {
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 56px;
  height: 56px;
  font-size: 28px;
  cursor: pointer;
  transform: scaleX(-1);
}

._bookmarks_container {
  position: relative;
  padding-bottom: 60px; /* Space for edit button */
}
</style>
