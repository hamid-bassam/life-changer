"use client"

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, ChevronRight, Goal, Paperclip, PenSquare, Plus } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { HierarchicalItem, ItemType } from "../../types/hierarchy"
import { HoveringRow, HoveringTable } from "./data-table-demo"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// const columnHelper = createColumnHelper<HoveringRow<HierarchicalItem>>();

export const columns: ColumnDef<HierarchicalItem, any>[] = [
  {
    id: "select",
    accessorKey: "id",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "type",
    header: () => <div className="text-center" >Type</div>,
    cell: ({ row, table }) => {
      const hoveringRow = row as HoveringRow<HierarchicalItem>;
      const item = hoveringRow.original;

      const hasChildren = item.children && item.children.length > 0;

      const handleAddInputClick = (event: React.MouseEvent) => {
        // Empêche la propagation de l'événement à la ligne
        event.stopPropagation();
        console.log("Button clicked in row:", row.original);
        console.log('clicked plus', row.getValue('title'));

        hoveringRow.addInput();
        table.resetRowSelection(true); // Deselect all rows


      };

      const handleExpandClick = (event: React.MouseEvent) => {
        //hasChildren ? 
        event.stopPropagation();
        hoveringRow.toggleExpanded();
        table.resetRowSelection(true); // Deselect all rows
        (table as HoveringTable<HierarchicalItem>).resetAddInput();
      }
      return (
        <div className="flex items-center ">

          <div style={{ paddingLeft: (item.depth ?? 0) * 20 }} className="capitalize">
            <div className="flex items-center justify-center gap-1">

              <Button
                variant={"ghost"}

                onClick={handleExpandClick}
                aria-hidden={!hasChildren}
                disabled={!hasChildren}
                className="w-4 h-4 p-0.5"
              >
                {hasChildren ?
                  (row.getIsExpanded() ? <ChevronDown className="w-full h-full" /> : <ChevronRight className="w-full" />)
                  :
                  <span className="inline-block h-4 w-4" />// Invisible placeholder
                }
              </Button>

              {row.getValue("type") === ItemType.GOAL ?
                <Goal className="h-5 w-5" /> : row.getValue("type") === ItemType.NOTE ?
                  <PenSquare className="h-5 w-5" /> : row.getValue("type") === ItemType.TASK ?
                    <Paperclip className="h-5 w-5" /> : null
              }

              <Button
                onClick={handleAddInputClick}
                variant="ghost"
                className="w-4 h-4 p-0.5"
                disabled={!hoveringRow.getIsHovered()}>

                {hoveringRow.getIsHovered() ? <Plus className="w-full h-full" /> : <span className="inline-block h-4 w-4" />}

              </Button>

            </div>
          </div>
        </div >
      )
    }
  },

  {
    accessorKey: "status",
    header: () => <div className="text-center" >Status</div>,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "importance",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}

          >
            Importance
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {


      return <div className="font-medium text-center">{row.getValue("importance")}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.id)}
            >
              Copy item ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View tasks...</DropdownMenuItem>
            <DropdownMenuItem>View item details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]