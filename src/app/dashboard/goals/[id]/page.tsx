

// import { Spinner } from "@nextui-org/react";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { GoalInputComponent } from "../../../../_components/GoalInputComponent";
import prisma from "../../../../lib/prisma";




export default async function Goal({ params }: { params: { id: string } }) {


  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const goal = await prisma.goal.findUnique({
    where: {
      id: params.id
    }
  });
  return (

    <div className='flex-1 min-h-full bg-transparent nowheel nodrag px-6 ' style={{ overflow: 'auto' }}>

      {/* <Suspense key={params.id} fallback={<div className="flex-1 flex min-h-full items-center justify-center"><Spinner color="primary" /></div>}>
        <EditorLogic id={params.id} />
      </Suspense> */}
      <GoalInputComponent goal={goal} />
    </div>

  );
}