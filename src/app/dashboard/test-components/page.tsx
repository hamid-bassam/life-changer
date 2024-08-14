
import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";

import GenericForm from "../../../_components/GenericForm";
import { SelectParentGoal } from "../../../_components/Goal/SelectParentGoal";
import { TreeBuilder } from "../../../_components/TreeBuilder";


export default function TestComponentPage() {

  return (
    <>
      <Suspense fallback={<div className="flex-1 flex min-h-full items-center justify-center"><Spinner color="primary" /></div>}  >
        <SelectParentGoal />
      </Suspense>
      <Suspense fallback={<div className="flex-1 flex min-h-full items-center justify-center"><Spinner color="primary" /></div>}  >
        <TreeBuilder >
          {({ tree }) => <GenericForm tree={tree} />}
        </TreeBuilder>
      </Suspense>
      {/* <Suspense fallback={<div className="flex-1 flex min-h-full items-center justify-center"><Spinner color="primary" /></div>}  >
        <TreeBuilder >
          {({ tree }) => <GenericList tree={tree} />}
        </TreeBuilder>
      </Suspense> */}


    </>
  );
}