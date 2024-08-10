"use client";


import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Slider } from "../../components/ui/slider";
import { mapPriorityIntToString, mapPriorityStringToInt, PriorityEnum } from "./GoalInputUtils";

const getSliderGradientClass = (value: number) => {
  if (value <= 20) {
    return `bg-gradient-to-r from-cyan-200 to-emerald-300`;
  } else if (value <= 40) {
    return `bg-gradient-to-r from-emerald-200  to-lime-300`;
  } else if (value <= 60) {
    return `bg-gradient-to-r from-lime-200  to-yellow-300`;
  } else if (value <= 80) {
    return `bg-gradient-to-r from-yellow-200  to-amber-300`;
  } else if (value <= 90) {
    return `bg-gradient-to-r from-amber-300 to-red-400`;
  } else {
    return `bg-gradient-to-r from-amber-400  to-destructive`;
  }
};

interface CustomGoalPriorityProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  customPriority: number;
}

export const CustomGoalPriority = <TFieldValues extends FieldValues>({
  control,
  name,
  customPriority,
}: CustomGoalPriorityProps<TFieldValues>) => {


  const [state, setState] = useState<
    {
      isCustom: boolean,
      customValue: number
    }
  >(
    {
      isCustom: !(customPriority === PriorityEnum.LOW || customPriority === PriorityEnum.MEDIUM || customPriority === PriorityEnum.HIGH),
      customValue: customPriority
    });

  const handleValueChange = (e: string, field: { onChange: (value: number) => void }) => {
    const priority = mapPriorityStringToInt(e);
    setState({
      ...state,
      isCustom: priority === PriorityEnum.CUSTOM,
      customValue: priority === PriorityEnum.CUSTOM ? state.customValue : priority
    });
    field.onChange(priority);
  };

  const handleCustomValueChange = (value: number[], field: { onChange: (value: number) => void }) => {
    const newValue = value[0];
    setState((prev) => ({ ...prev, customValue: newValue }))
    field.onChange(newValue);
  };

  console.log("render comp")
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Priority</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-4">
              <Select
                defaultValue={PriorityEnum[field.value]}
                value={mapPriorityIntToString(field.value)}
                onValueChange={e => handleValueChange(e, field)}
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
                  <FormLabel htmlFor="customPriority">Custom Priority</FormLabel>

                  <Slider
                    rangeColor={getSliderGradientClass(state.customValue)}
                    value={[state.customValue]}
                    step={5}
                    max={100}
                    onValueChange={(e) => handleCustomValueChange(e, field)}
                  />
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};