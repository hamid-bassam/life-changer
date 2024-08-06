import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Note } from '@prisma/client';
import { notFound } from "next/navigation";
import { AddButton } from './AddButton';
import { NoteCard } from './NoteCard';

export const Notes = async () => {

  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const notes: Note[] = await prisma.note.findMany({
    where: {
      userId: 1
    }
  });
  if (!notes) {
    notFound();
  }
  else {

    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        {notes.map(n => (<NoteCard key={n.id} note={n} />))}
        <AddButton />
      </div>
    )
  }

};