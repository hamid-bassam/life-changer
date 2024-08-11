import { Tag } from "@prisma/client";

export enum ItemType {
  GOAL = 'goal',
  TASK = 'task',
  NOTE = 'note',
}

export interface HierarchicalItem {
  id: string;
  title: string;
  status?: string;
  depth?: number;
  importance?: number;
  parentId?: string;
  children?: HierarchicalItem[];
  type: ItemType;           // Attribut type pour identifier le type d'élément
}

export interface GoalHierarchy extends HierarchicalItem {
  description?: string;
  status: string;
  priority: number;
  dueDate?: Date;
  isChild: boolean;
  tasks: TaskHierarchy[];
  notes: NoteHierarchy[];
  tags: Tag[];
}

export interface TaskHierarchy extends HierarchicalItem {
  ref: string;
  description?: string;
  status: string;
  dueDate?: Date;
  goalId?: string;
  notes: NoteHierarchy[];
  tags: Tag[];
}

export interface NoteHierarchy {
  id: string;
  title: string;
  document?: any;
  htmlContent?: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  goalId?: string;
  taskId?: string;
  type: ItemType;
}
