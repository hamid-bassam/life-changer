"use server";
import prisma from "../lib/prisma";

export async function createNote() {
  const note = await prisma.note.create({
    data: {
      title: "New Note",
      content: "New Note Content",

    }
  });

  return note;
}