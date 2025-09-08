export type BookmarkTreeNode = {
  id: string;
  parentId?: string;
  index?: number;
  url?: string;
  altUrl?: string; // Альтернативная ссылка
  title: string;
  dateAdded?: number;
  dateGroupModified?: number;
  children?: BookmarkTreeNode[];
  iconUrl?: string;
};

export type BookmarkEdit = {
  id: string;
  title: string;
  url: string;
  altUrl?: string; // Альтернативная ссылка
  iconUrl?: string;
}