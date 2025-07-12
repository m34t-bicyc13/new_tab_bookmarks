import type { BookmarkTreeNode } from "../types/commonTypes";

// Получить кастомные иконки из storage
export const getCustomIcons = (
  callback: (icons: { [key: string]: string }) => void
) => {
  chrome.storage.local.get({ customIcons: {} }, (result) => {
    callback(result.customIcons || {});
  });
};

// Сохранить кастомную иконку
export const setCustomIcon = (
  bookmarkId: string,
  iconUrl: string,
  callback: () => void
) => {
  getCustomIcons((customIcons) => {
    if (iconUrl) {
      customIcons[bookmarkId] = iconUrl;
    } else {
      delete customIcons[bookmarkId];
    }
    chrome.storage.local.set({ customIcons }, callback);
  });
};

// Функция для обновления закладок иконками
export const updateBookmarksWithIcons = (
  bookmarks: BookmarkTreeNode[],
  icons: { [key: string]: string }
) => {
  bookmarks.forEach((bookmark) => {
    if (icons[bookmark.id]) {
      bookmark.iconUrl = icons[bookmark.id];
    }
    if (bookmark.children) {
      updateBookmarksWithIcons(bookmark.children, icons);
    }
  });
};