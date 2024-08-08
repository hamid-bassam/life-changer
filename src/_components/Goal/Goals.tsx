
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { notFound } from "next/navigation";
import prisma from '../../lib/prisma';
import { AddButton } from '../AddButton';
import { GoalCard } from './GoalCard';
export const Goals = async () => {

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const goals = await prisma.goal.findMany({
    where: {
      userId: user?.id
    }
  });
  if (!goals) {
    notFound();
  }
  else {

    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 ">
        <AddButton link='goals/create' />
        {goals.map(g => (<GoalCard key={g.id} goal={g} />))}

      </div>
    )
  }

};