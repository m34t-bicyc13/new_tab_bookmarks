<template>
  <div class="_bookmark_wrapper" :key="bookmark.id">
    <NA
      class="_bookmark_card"
      :href="bookmark.url"
      rel="noopener noreferrer"
      @mousedown="startHold"
      @mouseup="cancelHold"
      @mouseleave="cancelHold"
      @touchstart="startHold"
      @touchend="cancelHold"
      @click="handleClick"
    >
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
import { ref } from "vue";

const props = defineProps<{
  bookmark: BookmarkTreeNode;
  editMode?: boolean;
  handleEditClick: Function;
}>();

const holdTimeout = ref<number | null>(null);
const holdTriggered = ref(false);
const HOLD_DELAY = 500; // мс

function startHold() {
  if (!props.bookmark.altUrl) return;
  holdTriggered.value = false;
  holdTimeout.value = window.setTimeout(() => {
    holdTriggered.value = true;
    window.open(props.bookmark.altUrl, '_self');
  }, HOLD_DELAY);
}

function cancelHold() {
  if (holdTimeout.value) {
    clearTimeout(holdTimeout.value);
    holdTimeout.value = null;
  }
}

function handleClick(e: MouseEvent) {
  if (holdTriggered.value) {
    e.preventDefault(); // отменить обычный переход, если был холд
    holdTriggered.value = false;
  }
}
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
