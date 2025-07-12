export type BookmarkTreeNode = {
  id: string;
  parentId?: string;
  index?: number;
  url?: string;
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
  iconUrl?: string;
}