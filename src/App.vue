<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    :theme="isDarkTheme ? darkTheme : null"
  >
    <NGlobalStyle />
    <MainPage />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, darkTheme } from "naive-ui";
import type { GlobalThemeOverrides } from "naive-ui";
import MainPage from "./pages/MainPage.vue";
import { ref } from "vue";

// Глобальные настройки темы
const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: "monospace",
    borderRadius: "20px",
  },
  Card: {
    paddingMedium: "20px",
  },
};

const isDarkTheme = ref(true);
</script>
