// Получить кастомные иконки из storage
export const getCustomIcons = (
  callback: (icons: { [key: string]: string }) => void
) => {
  chrome.storage.sync.get({ customIcons: {} }, (result) => {
    callback(result.customIcons || {});
  });
};

// Сохранить кастомную иконку
export const setCustomIcon = (
  bookmarkUrl: string,
  iconUrl: string,
  callback: () => void
) => {
  getCustomIcons((customIcons) => {
    if (iconUrl) {
      customIcons[bookmarkUrl] = iconUrl;
    } else {
      delete customIcons[bookmarkUrl];
    }
    chrome.storage.sync.set({ customIcons }, callback);
  });
};

// Получить URL иконки для закладки
export const getFaviconUrl = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
  } catch {
    return "";
  }
};
