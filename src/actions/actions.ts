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