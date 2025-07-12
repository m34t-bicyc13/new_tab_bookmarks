<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    :theme="isDarkTheme ? darkTheme : null"
  >
    <NCard class="app">
      <MainPage />
    </NCard>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NCard, darkTheme } from "naive-ui";
import type { GlobalThemeOverrides } from "naive-ui";
import MainPage from "./pages/MainPage.vue";
import { ref } from "vue";

// Глобальные настройки темы
const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: "monospace",
  }
};

const isDarkTheme = ref(true);
</script>
