
import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";
import { SelectParentGoal } from "../../../_components/Goal/SelectParentGoal";

export default function TestComponentPage() {

  return (
    <>
      <Suspense fallback={<div className="flex-1 flex min-h-full items-center justify-center"><Spinner color="primary" /></div>}  >
        <SelectParentGoal />
      </Suspense>

    </>
  );
}