// Получить URL иконки для закладки
export const getFaviconUrl = (url: string): string => {
  try {
    // Используем 'google.com' вместо 'www.google.com' для надежности
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
  } catch {
    // Возвращаем пустую строку для невалидных URL (например, 'javascript:...')
    return "";
  }
};