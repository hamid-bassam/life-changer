"use server";
import { BadgeVariant, Prisma } from "@prisma/client";

import { revalidatePath } from "next/cache";
import { TagInputType } from "../_components/Goal/GoalInputUtils";
import prisma from "../lib/prisma";

export async function createNote(data: Prisma.NoteCreateManyInput) {
  const note = await prisma.note.create({
    data: data
  });
  revalidatePath(`/notes`);
  return note;
}

export async function editNote(
  id: string,
  data: Prisma.NoteUpdateInput
) {
  const note = await prisma.note.update({
    where: { id: id },
    data: data
  });
  revalidatePath(`/notes`);
  return note;
}

export async function deleteNote(
  id: string
) {
  await prisma.note.delete({
    where: { id: id }
  });
  revalidatePath(`/notes`);

}

export async function createGoal(data: Prisma.GoalCreateInput, tags: TagInputType[]) {
  const goal = await prisma.goal.create({
    data: {
      ...data,

      tags: {
        connectOrCreate: tags.map(tag => ({
          where: {
            name_color_variant: {
              name: tag.name,
              color: tag.color || "bg-primary",
              variant: tag.variant || BadgeVariant.DEFAULT,
            },
          },
          create: {
            name: tag.name,
            color: tag.color || "bg-primary",
            variant: tag.variant || BadgeVariant.DEFAULT,
          },
        })),



      }
    },

  });
  revalidatePath(`/goals`);
  return goal;
}

// export async function editGoal(
//   id: string,
//   data: Prisma.GoalUpdateInput
// ) {
//   const goal = await prisma.goal.update({
//     where: { id: id },
//     data: data
//   });
//   revalidatePath(`/goals`);
//   return goal;
// }

export async function editGoal(
  id: string,
  data: Prisma.GoalUpdateInput,
  tags: TagInputType[]
) {
  const goal = await prisma.goal.update({
    where: { id: id },
    data: {
      ...data,
      tags: {
        // Disconnect all existing tags first (optional, depending on desired behavior)
        set: [],

        // Then connect or create new tags
        connectOrCreate: tags.map(tag => ({
          where: {
            name_color_variant: {
              name: tag.name,
              color: tag.color || "bg-primary",
              variant: tag.variant || BadgeVariant.DEFAULT,
            },
          },
          create: {
            name: tag.name,
            color: tag.color || "bg-primary",
            variant: tag.variant || BadgeVariant.DEFAULT,
          },
        })),
      }
    },
  });
  revalidatePath(`/goals`);
  return goal;
}

export async function deleteGoal(
  id: string
) {
  await prisma.goal.delete({
    where: { id: id },
  });
  revalidatePath(`/goals`);

}
