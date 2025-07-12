<template>
  <NCard class="_main_container">
    <Search />
    <BookmarksContainer />
  </NCard>
</template>

<script setup lang="ts">
import Search from "../components/Search.vue";
import BookmarksContainer from "../components/BookmarksContainer.vue";
import { NCard } from "naive-ui";
</script>

<style scoped></style>
