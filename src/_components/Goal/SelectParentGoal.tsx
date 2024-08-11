
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from '../../lib/prisma';
import { SelectGoalComponent } from "./SelectGoalComponent";


export const SelectParentGoal = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const goals = await prisma.goal.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      title: true,
      depth: true,
      tags: {
        select: {
          id: true,
          name: true,
          color: true,

        }
      }
    }
  })


  return (

    <SelectGoalComponent goals={goals} />

  );
};