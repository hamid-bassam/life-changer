
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { CreateGoalForm } from "../../../../_components/Goal/CreateGoalForm";
import { EditGoalForm } from "../../../../_components/Goal/EditGoalForm";
import prisma from "../../../../lib/prisma";




export default async function Goal({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } }) {



  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect('/welcome');
  }
  const goal = await prisma.goal.findUnique({
    where: {
      id: params.id
    },
    include: {
      tags: true,

    }
  });
  const { parentId } = searchParams ?? { parentId: "" };

  const parentGoal = await prisma.goal.findUnique({
    where: {
      id: parentId as string,
    },
    select: {
      id: true,
      depth: true
    }
  });

  return (

    <div className=' flex-1 min-h-full bg-transparent px-6'>
      {params.id === 'create' ? (
        <CreateGoalForm userId={user.id} parentGoal={parentGoal} />
      ) : (
        <EditGoalForm goalId={params.id} goal={goal} />
      )}
    </div>

  );
}