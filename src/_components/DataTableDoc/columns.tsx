"use client"

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, ChevronRight, Goal, Paperclip, PenSquare, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { updateItem } from "../../actions/data-table-actions"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Slider } from "../../components/ui/slider"
import { cn } from "../../lib/utils"
import { HierarchicalItem, ItemType } from "../../types/hierarchy"
import { getSliderGradientClass } from "../Goal/CustomGoalPriority"
import { mapPriorityIntToString, mapPriorityStringToInt, PriorityEnum } from "../Goal/GoalInputUtils"
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
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
          className="w-3 h-3 flex items-center justify-center"

        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center ">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value, { selectChildren: true })}
          aria-label="Select row"
          className="w-3 h-3 flex items-center justify-center"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,

  },

  {
    accessorKey: "type",
    header: () => <div className="text-center w-full text-xs font-semibold" >Type</div>,
    cell: ({ row, table }) => {
      const hoveringRow = row as HoveringRow<HierarchicalItem>;
      const item = hoveringRow.original;

      const hasChildren = item.children && item.children.length > 0;

      const handleAddInputClick = (event: React.MouseEvent, type: string) => {
        // Empêche la propagation de l'événement à la ligne
        event.stopPropagation();
        console.log("Button clicked in row:", row.original);
        console.log('clicked plus', row.getValue('title'));
        hoveringRow.addInput(type);
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
        <div className="flex items-center w-fit ">
          <div style={{ paddingLeft: (item.depth ?? 0) * 20 }} className="capitalize ">
            <div className="flex items-center gap-1">
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
                <Goal className="h-4 w-4" /> : row.getValue("type") === ItemType.NOTE ?
                  <PenSquare className="h-4 w-4" /> : row.getValue("type") === ItemType.TASK ?
                    <Paperclip className="h-4 w-4" /> : null
              }
              <DropdownMenu>
                <DropdownMenuTrigger asChild>

                  <Button
                    // onClick={handleAddInputClick}
                    variant="ghost"
                    className="w-4 h-4 p-0.5"
                    disabled={!hoveringRow.getIsHovered()}>
                    {hoveringRow.getIsHovered() ? <Plus className="w-full h-full " /> : <span className="inline-block h-4 w-4" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={(e) => handleAddInputClick(e, ItemType.GOAL)}><Goal className="h-4 w-4" /></DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleAddInputClick(e, ItemType.TASK)}><Paperclip className="h-4 w-4" /></DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleAddInputClick(e, ItemType.NOTE)}><PenSquare className="h-4 w-4" /></DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div >
      )
    }
  },


  {
    accessorKey: "title",

    header: ({ column }) => {
      return (
        <Button
          className="w-full flex font-semibold text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <CaretSortIcon className="h-4 w-4 ml-auto " />
        </Button>
      )
    },
    cell: ({ row, table }) => {
      const [title, setTitle] = useState<string>(row.getValue("title"));
      const [isEditing, setIsEditing] = useState(false);
      const handleSave = async () => {
        setIsEditing(false);
        await updateItem(row.original, { title: title });
        console.log('saved in db', title);
        (table.options.meta as any).updateHierarchicalRoots(row.id, { title: title });
        toast.success('Saved');
      };

      return isEditing ? (
        <div className="flex items-center"
          onClick={(e) => e.stopPropagation()}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            onBlur={handleSave}
            autoFocus
            onKeyDown={async (e) => e.key === "Enter" && await handleSave()}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <span onClick={() => setIsEditing(true)} className="cursor-text">
            {title}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center w-full" >Status</div>,
    cell: ({ row, table }) => {
      const [status, setStatus] = useState<string>(row.getValue("status"));
      const HandleValueChange = async (value: string) => {
        setStatus(value);
        await updateItem(row.original, { status: value });
        (table.options.meta as any).updateHierarchicalRoots(row.id, { status: value });
        toast.success('Saved Status');
      }
      if (row.original.type === ItemType.NOTE) return;

      return (
        <div className="flex items-center justify-center">
          <Select

            value={status}
            onValueChange={HandleValueChange}

          >
            <SelectTrigger className="max-w-fit">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending"><Badge className="w-24">Pending</Badge></SelectItem>
              <SelectItem value="In Progress"><Badge className="bg-sky-300 w-24">In Progress</Badge></SelectItem>
              <SelectItem value="Completed"><Badge className="bg-lime-500 w-24">Completed</Badge></SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    }

  },
  {
    accessorKey: "importance",
    header: ({ column }) => {
      return (

        <Button
          className="flex w-full font-semibold text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}

        >
          Importance
          <CaretSortIcon className="ml-auto h-4 w-4" />
        </Button>

      )
    },
    cell: ({ row, table }) => {

      const importance = row.getValue("importance") as number;
      const [state, setState] = useState<
        {
          isCustom: boolean,
          customValue: number
        }
      >(
        {
          isCustom: !(importance === PriorityEnum.LOW || importance === PriorityEnum.MEDIUM || importance === PriorityEnum.HIGH),
          customValue: importance
        });

      const handleValueChange = async (e: string) => {
        const importance = mapPriorityStringToInt(e);
        setState({
          ...state,
          isCustom: importance === PriorityEnum.CUSTOM,
          customValue: importance,
        });
        if (importance !== PriorityEnum.CUSTOM) {
          await updateItem(row.original, { importance: importance });
          (table.options.meta as any).updateHierarchicalRoots(row.id, { importance: importance });
        }
      };

      if (row.original.type === ItemType.NOTE) return;

      return (
        <div className={cn("flex flex-col gap-1", state.isCustom ? "" : "w-24")}>
          <div className="flex items-center justify-center">
            <Select
              defaultValue={PriorityEnum[state.customValue]}
              value={mapPriorityIntToString(state.customValue)}
              onValueChange={handleValueChange}
            >
              <SelectTrigger
                onClick={(e) => e.stopPropagation()}
              >
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="CUSTOM">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {
            state.isCustom && (

              <Slider
                rangeColor={getSliderGradientClass(state.customValue)}
                value={[state.customValue]}
                step={5}
                max={100}
                onValueChange={(value) => setState((prev) => ({ ...prev, customValue: value[0] }))}
                onMouseOutCapture={async (e) => {
                  e.stopPropagation();
                  await updateItem(row.original, { importance: state.customValue });
                  (table.options.meta as any).updateHierarchicalRoots(row.id, { importance: state.customValue });
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
              />
            )
          }
        </div>


      )
    }
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