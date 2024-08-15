"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { HierarchicalItem, ItemType } from "../types/hierarchy";

export async function updateItem(item: HierarchicalItem, data: any) {
  const type = item.type;
  try {
    switch (type) {
      case ItemType.GOAL:
        await prisma.goal.update({
          where: { id: item.id },
          data
        });
      case ItemType.NOTE:
        await prisma.note.update({
          where: { id: item.id },
          data
        });
      case ItemType.TASK:
        await prisma.task.update({
          where: { id: item.id },
          data
        });
      default:
        break;

    }
    revalidatePath('/goals');
  }
  catch (e) {
    return ({ success: false, error: 'failed to update item' });
  }

  return ({ success: true });
}

export async function createItem(userId: string, item: HierarchicalItem, data: any) {
  const type = item.type;
  const newItem = await (prisma[type] as any).create({
    data: {
      ...data,
      priority: item.importance,
    }
  });
  revalidatePath('/');
  return newItem;

}
//{ type: state.type, title: state.title, status: state.status, importance: state.importance }
export async function createItemm(userId: string, parent: HierarchicalItem, item: any) {
  const type = item.type;
  const parentType = parent.type;
  let newItem; // Declare the variable here
  if (type === ItemType.GOAL && parentType === ItemType.TASK) {
    throw new Error('Cannot create a goal under a task');
  }
  if (type === ItemType.GOAL && parentType === ItemType.GOAL) {
    newItem = await prisma.goal.create({
      data: {
        userId: userId,
        title: item.title,
        status: item.status,
        importance: item.importance,
        isChild: true,
        parentGoalId: parent.id,
        depth: (parent.depth ?? 0) + 1,
        priority: item.importance, // will change 
      }
    });
  } else if (type === ItemType.TASK) {
    if (parentType === ItemType.GOAL) {
      newItem = await prisma.task.create({
        data: {
          userId: userId,
          // ref: parent.title.split(' ').map((word: string) => word.charAt(0).toUpperCase()).join(''),
          ref: "a mediter",
          title: item.title,
          status: item.status,
          importance: item.importance,
          goalId: parent.id,
          depth: (parent.depth ?? 0) + 1,
          priority: item.importance,


        }
      });
    } else if (parentType === ItemType.TASK) {
      newItem = await prisma.task.create({
        data: {
          userId: userId,
          // ref: parent.title.split(' ').map((word: string) => word.charAt(0).toUpperCase()).join(''),
          ref: "a mediter",
          title: item.title,
          status: item.status,
          importance: item.importance,
          parentTaskId: parent.id,
          depth: (parent.depth ?? 0) + 1,
          priority: item.importance,
        }
      });
    }
  }
  else if (type === ItemType.NOTE) {
    // case note a detailler coté ux 
    if (parentType === ItemType.GOAL || parentType === ItemType.TASK) {
      newItem = await prisma.note.create({
        data: {
          userId: userId,
          title: item.title,
          goalId: parentType === ItemType.GOAL ? parent.id : undefined,
          taskId: parentType === ItemType.TASK ? parent.id : undefined,
        }
      });
    }
  }
  revalidatePath('/');
  return newItem;
}