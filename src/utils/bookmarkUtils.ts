import type { BookmarkTreeNode } from "../types/commonTypes";

/**
 * Рекурсивно применяет кастомные иконки к дереву закладок.
 * Мутирует исходный массив.
 */
export const applyCustomIconsToTree = (
  nodes: BookmarkTreeNode[],
  icons: { [key: string]: string }
): void => {
  for (const node of nodes) {
    if (node.url && icons[node.url]) {
      node.iconUrl = icons[node.url];
    }
    if (node.children) {
      applyCustomIconsToTree(node.children, icons);
    }
  }
};

/**
 * Рекурсивно находит узел в дереве и заменяет его.
 * @returns true, если узел был найден и заменен, иначе false.
 */
export const findAndReplaceNode = (
  nodes: BookmarkTreeNode[],
  updatedNode: BookmarkTreeNode
): boolean => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === updatedNode.id) {
      // Заменяем узел, сохраняя возможные дочерние элементы, если их нет в updatedNode
      nodes[i] = { ...node, ...updatedNode };
      return true;
    }
    if (node.children && findAndReplaceNode(node.children, updatedNode)) {
      return true;
    }
  }
  return false;
};
