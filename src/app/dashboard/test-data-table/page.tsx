
import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";

import { columns } from "../../../_components/DataTableDoc/columns";
import { DataTableDemo } from "../../../_components/DataTableDoc/data-table-demo";
import { TreeBuilder } from "../../../_components/TreeBuilder";
import { flattenTree } from "../../../lib/hierachy-utils";

export default function TestDataTablePage() {

  return (
    <>

      <Suspense fallback={<div className="flex-1 flex min-h-full items-center justify-center"><Spinner color="primary" /></div>}  >

        <div className="container mx-auto py-10">
          <TreeBuilder >
            {({ tree }) => <DataTableDemo columns={columns} data={flattenTree(tree)} roots={tree} />}
          </TreeBuilder>
        </div>
      </Suspense>

    </>
  );
}