import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import prisma from '@/lib/prisma';
import { notFound } from "next/navigation";
import { Card } from '../components/ui/card';

export const Notes = async () => {

  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const notes = await prisma.note.findMany({
    where: {
      userId: 1
    }
  });
  if (!notes) {
    notFound();
  }
  else {

    return (
      <div>{notes.map(n => (<Card key={n.id}>{n.title}</Card>))}</div>
    )
  }

};