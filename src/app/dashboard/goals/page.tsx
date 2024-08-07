import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Spinner } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Goals } from "../../../_components/Goals";



export default async function GoalsPage() {

  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) {
    redirect('/');
  }
  return (

    <Suspense fallback={<div className="flex-1 flex min-h-full items-center justify-center"><Spinner color="primary" /></div>} >
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
          <Goals />
        </div>
      </div>
    </Suspense>



  )

} 