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