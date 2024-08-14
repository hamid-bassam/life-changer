import { HierarchicalItem } from "../types/hierarchy";

export function buildTree(items: HierarchicalItem[]): HierarchicalItem[] {
  const itemMap: { [key: string]: HierarchicalItem } = {};
  const roots: HierarchicalItem[] = [];

  // Indexer les items par id
  items.forEach(item => {
    itemMap[item.id] = { ...item, children: [] };
  });

  // Établir les relations parent-enfant
  items.forEach(item => {
    if (item.parentId) {
      const parent = itemMap[item.parentId];
      if (parent) {
        parent.children!.push(itemMap[item.id]);
        itemMap[item.id].depth = (parent.depth ?? 0) + 1;
      }
    } else {
      roots.push(itemMap[item.id]);
    }
  });

  return roots;
}


export function flattenTree(tree: HierarchicalItem[]): HierarchicalItem[] {
  const result: HierarchicalItem[] = [];

  const flatten = (item: HierarchicalItem) => {
    result.push(item);
    item.children?.forEach(flatten);
  };

  tree.forEach(flatten);
  console.log('result tree', result);

  return result;
}