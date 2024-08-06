import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Suspense } from "react";

import { Spinner } from "@nextui-org/react";
import { Notes } from "../../../_components/Notes";
export default async function NotesPage() {

  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) {
    return (
      <div>
        <div>Not Authenticated</div>
      </div>
    )
  }
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Suspense fallback={<Spinner color="primary" />}>
            <Notes />
          </Suspense>
          <div className="flex w-16 h-16 justify-center items-center"></div>
        </div>
      </div>
    </div>
  )

} 