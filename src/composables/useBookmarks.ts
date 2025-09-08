import { ref, onMounted } from "vue";
import type { BookmarkTreeNode, BookmarkEdit } from "../types/commonTypes";
import * as chromeApi from "../services/chromeApi";
import { applyCustomDataToTree, findAndReplaceNode } from "../utils/bookmarkUtils";

export function useBookmarks() {
  const bookmarksData = ref<BookmarkTreeNode[] | null>(null);
  const errorMessage = ref("");
  const isLoading = ref(true);

  const loadBookmarks = async () => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const [response, icons, altUrls] = await Promise.all([
        chromeApi.sendMessageAsync<{ data?: string }>({ action: "getBookmarks" }),
        chromeApi.getCustomIconsAsync(),
        chromeApi.getCustomAltUrlsAsync(),
      ]);

      if (!response?.data) {
        throw new Error("Не удалось получить закладки.");
      }

      const bookmarks: BookmarkTreeNode[] = JSON.parse(response.data);
      applyCustomDataToTree(bookmarks, icons, altUrls); // Используем утилиту
      bookmarksData.value = bookmarks;

    } catch (e: any) {
      errorMessage.value = e.message || "Ошибка при загрузке данных.";
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  const saveBookmark = async (bookmark: BookmarkEdit) => {
    try {
      const [updatedNode] = await Promise.all([
        chromeApi.updateBookmarkAsync(bookmark.id, {
          title: bookmark.title,
          url: bookmark.url,
        }),
        chromeApi.setCustomIconAsync(bookmark.url, bookmark.iconUrl ?? ""),
        chromeApi.setCustomAltUrlAsync(bookmark.url, bookmark.altUrl ?? ""),
      ]);

      // Добавляем altUrl в локальное дерево
      const nodeWithCustomData: BookmarkTreeNode = {
        ...updatedNode,
        iconUrl: bookmark.iconUrl,
        altUrl: bookmark.altUrl,
      };

      if (bookmarksData.value) {
        findAndReplaceNode(bookmarksData.value, nodeWithCustomData); // Используем утилиту
      }

      return nodeWithCustomData;

    } catch (e: any) {
      errorMessage.value = "Ошибка при сохранении закладки.";
      console.error(e);
      throw e;
    }
  };

  onMounted(loadBookmarks);

  return {
    bookmarksData,
    errorMessage,
    isLoading,
    loadBookmarks,
    saveBookmark,
  };
}