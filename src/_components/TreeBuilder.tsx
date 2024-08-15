// src/components/FormDataFetcher.tsx

import React from 'react';

import { HierarchicalItem } from '@/types/hierarchy';
import { getHierarchicalItems } from '../actions/actions';
import { buildTree } from '../lib/hierachy-utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

type TreeBuilderProps = {
  children: (props: { tree: HierarchicalItem[], userId: string }) => React.AwaitedReactNode; // Fonction de rendu
};

export const TreeBuilder = async ({ children }: TreeBuilderProps) => {

  const items = await getHierarchicalItems(); // Remplacez par votre fonction d'appel API
  const tree = buildTree(items);
  const { getUser } = getKindeServerSession();

  const user = await getUser();


  return children({ tree, userId: user?.id ?? "user-not-logged-in" });
};
