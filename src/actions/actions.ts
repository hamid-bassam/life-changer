"use server";
import { Prisma } from "@prisma/client";

import prisma from "../lib/prisma";

export async function createNote(data: Prisma.NoteCreateManyInput) {
  const note = await prisma.note.create({
    data: data
  });
  return note;
}