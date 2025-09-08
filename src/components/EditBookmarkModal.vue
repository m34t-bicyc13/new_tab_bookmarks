<template>
  <NModal v-model:show="show">
    <NCard
      style="width: 800px"
      title="Изменение закладки"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      <NForm>
        <NFormItem label="Название">
          <NInput v-model:value="editingBookmark.title" placeholder="Example" />
        </NFormItem>
        <NFormItem label="Ссылка">
          <NInput
            v-model:value="editingBookmark.url"
            placeholder="https://example.com"
          />
        </NFormItem>
        <NFormItem label="Альтернативная ссылка (по Ctrl/Shift)">
          <NInput
            v-model:value="editingBookmark.altUrl"
            placeholder="https://alternative.com"
          />
        </NFormItem>
        <NFormItem label="Иконка">
          <NInput
            v-model:value="editingBookmark.iconUrl"
            placeholder="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons@master/svg/icon_name.svg"
          />
        </NFormItem>
      </NForm>

      <template #footer>
        <NSpace justify="end">
          <NButton @click="onCancel">Отмена</NButton>
          <NButton type="primary" @click="onSave">Сохранить</NButton>
        </NSpace>
      </template>
    </NCard>
  </NModal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import {
  NModal,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NSpace,
  NButton,
} from "naive-ui";
import type { BookmarkEdit } from "../types/commonTypes";

const props = defineProps<{
  bookmark: BookmarkEdit;
  show: boolean;
}>();

const emit = defineEmits(["update:show", "save", "cancel"]);

const editingBookmark = ref({ ...props.bookmark });

watch(
  () => props.bookmark,
  (newBookmark) => {
    editingBookmark.value = { ...newBookmark };
  }
);

const onSave = () => {
  emit("save", editingBookmark.value);
};

const onCancel = () => {
  emit("cancel");
};
</script>
