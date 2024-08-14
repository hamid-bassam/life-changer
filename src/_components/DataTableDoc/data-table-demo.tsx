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
import { HierarchicalItem } from "../../types/hierarchy"
import { HoveringFeature } from "./tanstack-table-hovering"
export type HoveringRow<TData> = Row<TData> & {
  toggleHovered: (toggle?: boolean) => void;
  getIsHovered: () => boolean;
  addInput: () => void;
  getShowInput: () => boolean;
};
export interface HoveringTable<TData> extends TableType<TData> {
  resetAddInput: () => void;
  getHoveredRows: () => HoveringRow<TData>[];
  setHoveredRows: (updater: (old: HoveringRow<TData>[]) => HoveringRow<TData>[]) => void;
}

export function DataTableDemo({ columns, data, roots }: { columns: ColumnDef<HierarchicalItem>[], data: HierarchicalItem[], roots: HierarchicalItem[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columnsMemo = useMemo(() => columns, []);
  const [dataMemo, setDataMemo] = React.useState<HierarchicalItem[]>(data);
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
    filterFromLeafRows: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    getRowId: (row) => row.id,
    getSubRows: (row) => row.children,
    _features: [HoveringFeature],
  }) as HoveringTable<HierarchicalItem>;



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
            setRowSelection({ [row.id]: !row.getIsSelected() });
            (table as any).resetAddInput();
          }}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
        {
          // aucun row n'est selectionné  ? 
          table.getSelectedRowModel().rows.length > 0 ? null : row.getShowInput() &&

            <div>test</div>}
        {row.getIsExpanded() && row.subRows && renderRows(row.subRows as HoveringRow<HierarchicalItem>[])} {/* Rendu des sous-lignes si expansées */}
      </React.Fragment>
    ));
  };
  return (
    <div className="w-full">
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
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
