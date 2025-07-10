<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <div class="app">
      <MainPage />
    </div>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider } from "naive-ui";
import type { GlobalThemeOverrides } from "naive-ui";
import MainPage from "./pages/MainPage.vue";

// Глобальные настройки темы
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#8350f9",
    primaryColorHover: "#8350f9",
    primaryColorPressed: "none",
  },
  Button: {
    border: "1px solid #e0e0e6",
    borderHover: "1px solid #8350f9",
    borderFocus: "1px solid #8350f9",
  },
  Input: {
    border: "1px solid #e0e0e6",
    borderHover: "1px solid #8350f9",
    borderFocus: "1px solid #8350f9",
    borderRadius: "100px",
  },
};
</script>
