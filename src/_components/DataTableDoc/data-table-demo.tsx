"use client"

import {
  ChevronDownIcon
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  Table as TableType,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMemo } from "react"
import { HierarchicalItem, ItemType } from "../../types/hierarchy"
import { AddInputRow } from "./AddInputRow"
import { HoveringFeature } from "./tanstack-table-hovering"
export type HoveringRow<TData> = Row<TData> & {
  toggleHovered: (toggle?: boolean) => void;
  getIsHovered: () => boolean;
  addInput: (type: string) => void;
  getShowInput: () => string;
};
export interface HoveringTable<TData> extends TableType<TData> {
  resetAddInput: () => void;
  getHoveredRows: () => HoveringRow<TData>[];
  setHoveredRows: (updater: (old: HoveringRow<TData>[]) => HoveringRow<TData>[]) => void;
}
function updateData(roots: HierarchicalItem[], id: string, newRecord: any): HierarchicalItem[] {
  return roots.map((item) => {
    // Si l'item correspond à l'ID, on retourne un nouvel item avec les nouvelles données
    if (item.id === id) {
      return {
        ...item,
        ...newRecord,  // Applique les modifications
      };
    }

    // Si l'item a des enfants, on les traite récursivement
    if (item.children) {
      return {
        ...item,
        children: updateData(item.children, id, newRecord) // Appliquer récursivement aux enfants
      };
    }

    // Si aucune modification n'a été apportée, on retourne l'item tel quel
    return item;
  });
}
function addNewItem(roots: HierarchicalItem[], parentId: string, newItem: HierarchicalItem): HierarchicalItem[] {
  return roots.map((item) => {
    if (item.id === parentId) {
      // Ajouter le nouvel élément en tant qu'enfant
      return {
        ...item,
        children: [...(item.children || []), newItem], // Ajouter le nouveau child
      };
    }

    if (item.children) {
      return {
        ...item,
        children: addNewItem(item.children, parentId, newItem), // Recurse dans les enfants
      };
    }

    return item; // Aucun changement, retourner l'élément tel quel
  });
}
export function DataTableDemo({ columns, data, roots, userId }: { columns: ColumnDef<HierarchicalItem>[], data: HierarchicalItem[], roots: HierarchicalItem[], userId: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columnsMemo = useMemo(() => columns, []);
  const [dataMemo, setDataMemo] = React.useState<HierarchicalItem[]>(roots);
  const table = useReactTable({
    data: dataMemo,
    columns: columnsMemo,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
    getSubRows: (row) => row.children,
    filterFromLeafRows: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableMultiRowSelection: true,
    _features: [HoveringFeature],
    meta: {
      updateHierarchicalRoots: (rowId: string, data: any) => {
        setDataMemo((prevData) => updateData(prevData, rowId, data));
      },
      addInput: (parentId: string, newItem: HierarchicalItem) => {
        setDataMemo((prevData) => addNewItem(prevData, parentId, newItem)
        );
      },
    }
  })



  const renderRows = (rows: HoveringRow<HierarchicalItem>[]) => {


    return rows.map((row) => (
      <React.Fragment key={row.id}>
        <TableRow
          // hover que pour le row mais pas les sous-lignes
          data-state={row.getIsSelected() && "selected"}
          onMouseEnter={() => {
            row.toggleHovered(true);
          }
          }
          onMouseLeave={() => {
            row.toggleHovered(false);
          }}
          onClick={() => {
            // setRowSelection({ [row.id]: !row.getIsSelected() });
            row.toggleSelected(!row.getIsSelected(), { selectChildren: true });
            (table as HoveringTable<HierarchicalItem>).resetAddInput();
          }}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} className="border
            ">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
        {
          // aucun row n'est selectionné  ? 
          table.getSelectedRowModel().rows.length > 0 ? null :
            // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

            row.getShowInput() && row.getShowInput() !== ItemType.NOTE &&
            <AddInputRow table={table} row={row} userId={userId} type={row.getShowInput()} />

          // ========================================================================      
        }
        {row.getIsExpanded() && row.subRows && renderRows(row.subRows as HoveringRow<HierarchicalItem>[])} {/* Rendu des sous-lignes si expansées */}
      </React.Fragment>
    ));
  };
  return (
    <div className="w-full !text-xs">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="border text-xs font-semibold">

                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* {roots.map((item) => <HierarchicalRow key={item.id} child={item} depth={0} table={table} />)} */}
            {/* {table.getRowModel().rows.map((row) => (
              <HierarchicalRow key={row.id} child={row.original} depth={0} table={table} />
            ))} */}
            {/* {renderRows(roots)} */}
            {/* {table.getRowModel().rows?.filter(row => row.original.depth === 0).map((row) => (
              <HierarchicalRow key={row.id} child={row.original} row={row} depth={0} table={table} />
            ))} */}
            {table.getRowModel().rows?.length ? (
              renderRows(table.getRowModel().rows as HoveringRow<HierarchicalItem>[])
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().flatRows.length} of{" "}
          {table.getRowModel().flatRows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

const HierarchicalRow = ({ child, depth, table, row }: { child: HierarchicalItem, depth: number, table: TableType<HierarchicalItem>, row: Row<HierarchicalItem> }) => {
  // const row = table.getRow(child.id);
  // const row = table.getRowModel().rowsById[child.id];
  return (
    <React.Fragment key={child.id}>
      <TableRow data-state={row.getIsSelected() && "selected"}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </TableCell>
        ))}
      </TableRow>
      {row.getIsExpanded() && row.subRows?.map((subrow) => (
        <HierarchicalRow
          key={subrow.id}
          child={subrow.original}
          depth={depth + 1}
          table={table}
          row={subrow}
        />
      ))}

    </React.Fragment>
  )
}
