import { ref, onMounted } from "vue";
import type { BookmarkTreeNode, BookmarkEdit } from "../types/commonTypes";
import {
  getCustomIcons,
  setCustomIcon,
  updateBookmarksWithIcons,
} from "../utils/commonUtils";

export function useBookmarks() {
  const bookmarksData = ref<BookmarkTreeNode[] | null>(null);
  const errorMessage = ref("");
  const customIcons = ref<{ [key: string]: string }>({});

  const loadBookmarks = () => {
    chrome.runtime.sendMessage({ action: "getBookmarks" }, (response) => {
      if (response?.data) {
        try {
          const bookmarks: BookmarkTreeNode[] = JSON.parse(response.data);

          getCustomIcons((icons) => {
            customIcons.value = icons;
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
  };

  const saveBookmark = (
    bookmark: BookmarkEdit,
    callback: (updatedNode: BookmarkTreeNode) => void
  ) => {
    chrome.bookmarks.update(
      bookmark.id,
      {
        title: bookmark.title,
        url: bookmark.url,
      },
      (updatedNode) => {
        setCustomIcon(bookmark.url, bookmark.iconUrl ?? "", () => {
          callback({ ...updatedNode, iconUrl: bookmark.iconUrl });
        });
      }
    );
  };

  onMounted(loadBookmarks);

  return {
    bookmarksData,
    errorMessage,
    customIcons,
    loadBookmarks,
    saveBookmark,
  };
}