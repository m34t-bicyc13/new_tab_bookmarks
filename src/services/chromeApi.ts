import type { BookmarkTreeNode } from "../types/commonTypes";

/**
 * Запрашивает данные у background-скрипта.
 * @param message - Сообщение для отправки.
 * @returns Promise с ответом от background-скрипта.
 */
export const sendMessageAsync = <T>(message: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        // Обрабатываем ошибку, если background-скрипт не ответил
        return reject(chrome.runtime.lastError);
      }
      resolve(response);
    });
  });
};

/**
 * Обновляет закладку в Chrome.
 * @param id - ID закладки.
 * @param changes - Объект с изменениями (title, url).
 * @returns Promise с обновленным узлом закладки.
 */
export const updateBookmarkAsync = (
  id: string,
  changes: { title?: string; url?: string }
): Promise<BookmarkTreeNode> => {
  return new Promise((resolve) => {
    chrome.bookmarks.update(id, changes, (updatedNode) => {
      resolve(updatedNode as BookmarkTreeNode);
    });
  });
};

/**
 * Получает кастомные иконки из storage.
 * @returns Promise, который разрешается объектом с иконками.
 */
export const getCustomIconsAsync = (): Promise<{ [key: string]: string }> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ customIcons: {} }, (result) => {
      resolve(result.customIcons || {});
    });
  });
};

/**
 * Сохраняет кастомную иконку.
 * @param bookmarkUrl - URL закладки, для которой сохраняется иконка.
 * @param iconUrl - URL иконки. Если пустая строка, иконка будет удалена.
 */
export const setCustomIconAsync = async (
  bookmarkUrl: string,
  iconUrl: string
): Promise<void> => {
  const customIcons = await getCustomIconsAsync();
  if (iconUrl) {
    customIcons[bookmarkUrl] = iconUrl;
  } else {
    // Если iconUrl пустой, удаляем запись, чтобы не хранить мусор
    delete customIcons[bookmarkUrl];
  }
  return new Promise((resolve) => {
    chrome.storage.sync.set({ customIcons }, resolve);
  });
};

/**
 * Получает альтернативные ссылки из storage.
 * @returns Promise, который разрешается объектом с альтернативными ссылками.
 */
export const getCustomAltUrlsAsync = (): Promise<{ [key: string]: string }> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ customAltUrls: {} }, (result) => {
      resolve(result.customAltUrls || {});
    });
  });
};

/**
 * Сохраняет альтернативную ссылку.
 * @param bookmarkUrl - URL закладки, для которой сохраняется altUrl.
 * @param altUrl - альтернативная ссылка. Если пустая строка, altUrl будет удалён.
 */
export const setCustomAltUrlAsync = async (
  bookmarkUrl: string,
  altUrl: string
): Promise<void> => {
  const customAltUrls = await getCustomAltUrlsAsync();
  if (altUrl) {
    customAltUrls[bookmarkUrl] = altUrl;
  } else {
    delete customAltUrls[bookmarkUrl];
  }
  return new Promise((resolve) => {
    chrome.storage.sync.set({ customAltUrls }, resolve);
  });
};
