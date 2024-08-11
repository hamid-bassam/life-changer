// src/components/FormDataFetcher.tsx

import React from 'react';

import { HierarchicalItem } from '@/types/hierarchy';
import { getHierarchicalItems } from '../actions/actions';
import { buildTree } from '../lib/hierachy-utils';

type TreeBuilderProps = {
  children: (props: { tree: HierarchicalItem[] }) => React.AwaitedReactNode; // Fonction de rendu
};

export const TreeBuilder = async ({ children }: TreeBuilderProps) => {

  const items = await getHierarchicalItems(); // Remplacez par votre fonction d'appel API
  const tree = buildTree(items);

  return children({ tree });
};
