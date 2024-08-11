import { useEffect, useState } from 'react';
import { getHierarchicalItems } from '../../actions/actions';
import { buildTree } from '../../lib/hierachy-utils';
import { HierarchicalItem } from '../../types/hierarchy';
import Tree from '../Tree';


export const TaskForm = () => {
  const [treeData, setTreeData] = useState<HierarchicalItem[]>([]);
  const [selectedParent, setSelectedParent] = useState<HierarchicalItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      const items = await getHierarchicalItems(); // Remplacez par votre fonction d'appel API
      const tree = buildTree(items);
      setTreeData(tree);
    }
    fetchData();
  }, []);

  const handleSelect = (item: HierarchicalItem) => {
    setSelectedParent(item);
  };

  const handleSubmit = () => {
    console.log('Selected Parent:', selectedParent);
    // Logique de soumission du formulaire
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Parent Goal</h2>
      <Tree items={treeData} onSelect={handleSelect} />
      {selectedParent && <p>Selected Parent: {selectedParent.title}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};


