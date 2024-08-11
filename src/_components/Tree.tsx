import React from 'react';
import { HierarchicalItem } from '../types/hierarchy';

type TreeProps = {
  items: HierarchicalItem[];
  onSelect: (item: HierarchicalItem) => void;
};

const TreeNode: React.FC<{ item: HierarchicalItem; onSelect: (item: HierarchicalItem) => void }> = ({ item, onSelect }) => {
  return (
    <div style={{ marginLeft: (item.depth ?? 5) * 20 }}>
      <div onClick={() => onSelect(item)} style={{ cursor: 'pointer' }}>
        {item.title}
      </div>
      {item.children?.map(child => (
        <TreeNode key={child.id} item={child} onSelect={onSelect} />
      ))}
    </div>
  );
};

const Tree: React.FC<TreeProps> = ({ items, onSelect }) => {
  return (
    <div>
      {items.map(item => (
        <TreeNode key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default Tree;
