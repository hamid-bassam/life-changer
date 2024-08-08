"use server";
import { Prisma } from "@prisma/client";

import { revalidatePath } from "next/cache";
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

export async function createGoal(data: Prisma.GoalCreateManyInput) {
  const goal = await prisma.goal.create({
    data: data
  });
  revalidatePath(`/goals`);
  return goal;
}

export async function editGoal(
  id: string,
  data: Prisma.GoalUpdateInput
) {
  const goal = await prisma.goal.update({
    where: { id: id },
    data: data
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
