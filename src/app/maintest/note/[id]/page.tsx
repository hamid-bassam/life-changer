

// import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
// import { Suspense } from "react";
// import { EditorLogic } from "../../../../_components/EditorLogic";
// import { Button } from "../../../../components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const MantineEditor = dynamic(() => import("@/features/blocknote/MantineEditor"), { ssr: false });



export default async function Note({ params }: { params: { id: string } }) {


  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (

    <div className='flex-1 min-h-full bg-transparent nowheel nodrag px-6 ' style={{ overflow: 'auto' }}>

      {/* <Suspense key={params.id} fallback={<div className="flex-1 flex min-h-full items-center justify-center"><Spinner color="primary" /></div>}>
        <EditorLogic id={params.id} />
      </Suspense> */}
      <MantineEditor userId={user?.id} />
    </div>

  );
}