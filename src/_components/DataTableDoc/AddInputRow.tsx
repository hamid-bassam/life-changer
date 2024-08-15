"use client"

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Slider } from "../../components/ui/slider";

import { Spinner } from "@nextui-org/react";
import { Row } from "@tanstack/react-table";
import { toast } from "sonner";
import { createItemm } from "../../actions/data-table-actions";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { TableCell, TableRow } from "../../components/ui/table";
import { HierarchicalItem, ItemType } from "../../types/hierarchy";
import { getSliderGradientClass } from "../Goal/CustomGoalPriority";
import { mapPriorityStringToInt, PriorityEnum } from "../Goal/GoalInputUtils";
import { HoveringTable } from "./data-table-demo";

export const AddInputRow = ({ table, row, userId }: { table: any, row: Row<HierarchicalItem>, userId: string }) => {

  const [state, setState] = useState<
    {
      isCustom?: boolean,
      customValue?: number,
      title: string,
      status?: string,
      importance?: number,
      type: ItemType,
      isSubmitting: boolean
    }
  >({ title: '', isSubmitting: false, type: ItemType.GOAL, importance: 0 });

  function mapStringToItemType(value: string): ItemType {
    switch (value) {
      case "goal":
        return ItemType.GOAL;
      case "task":
        return ItemType.TASK;
      case "note":
        return ItemType.NOTE;
      default:
        return ItemType.GOAL;
    }
  }

  return (
    <TableRow>
      {/* Colonne vide */}
      <TableCell></TableCell>

      {/* Colonne Select Type (Goal, Task, Note) */}
      <TableCell>
        <Select onValueChange={(value) => {
          console.log(value);
          setState(prev => ({ ...prev, type: mapStringToItemType(value) }))
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ItemType.GOAL}>Goal</SelectItem>
            <SelectItem value={ItemType.TASK}>Task</SelectItem>
            <SelectItem value={ItemType.NOTE}>Note</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* Colonne Titre */}
      <TableCell>
        <Input
          type="text"
          placeholder="Title"
          className="w-full px-2 py-1 border rounded-md"
          defaultValue={"My Title"} // Example title
          onChange={(e) => setState(prev => ({ ...prev, title: e.target.value }))}
        />
      </TableCell>

      {/* Colonne Status */}
      <TableCell>
        <Select onValueChange={(value) => setState(prev => ({ ...prev, status: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>

      {/* Colonne Importance */}
      <TableCell>
        <div className="flex flex-col gap-4">
          <Select
            onValueChange={(e) => {
              const priority = mapPriorityStringToInt(e);
              setState(prev => ({
                ...prev,
                isCustom: priority === PriorityEnum.CUSTOM,
                customValue: priority as number,
              }));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="CUSTOM">Custom</SelectItem>
            </SelectContent>
          </Select>
          {state.isCustom && (
            <div className="flex flex-col gap-4">
              <Slider
                rangeColor={getSliderGradientClass(state.customValue ?? 0)}
                value={[state.customValue ?? 0]}
                step={5}
                max={100}
                onValueChange={(e) => setState({ ...state, customValue: e[0] })}
              />
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Button onClick={async () => {
          setState({ ...state, isSubmitting: true });
          try {
            if (state.type !== "note") {
              const item = await createItemm(userId, row.original, { type: state.type, title: state.title, status: state.status, importance: state.importance });
              (table.options.meta as any).addInput(row.id, { ...item, type: state.type });
              (table as HoveringTable<HierarchicalItem>).resetAddInput();
              row.toggleExpanded();
              toast.success('Item created', { description: 'Item created successfully' });

            }
          } catch (e) {
            console.error(e);
            toast.error('Failed to create item', { description: 'failed to create item' });
          } finally {
            setState({ ...state, isSubmitting: false });
          }


        }}>
          {state.isSubmitting ? <Spinner /> : <span>Submit</span>}
        </Button>
      </TableCell>
    </TableRow>

  );
}