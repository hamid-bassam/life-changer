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
import { Control } from "react-hook-form";

import { z } from "zod";
import { Slider } from "../components/ui/slider";
import { GoalFormSchema, mapPriorityStringToInt, PriorityEnum } from "./Goal/GoalInput";

const getSliderGradientClass = (value: number) => {
  if (value <= 20) {
    return `bg-gradient-to-r from-green-200 to-primary`;
  } else if (value <= 40) {
    return `bg-gradient-to-r from-cyan-200 to-blue-500`;
  } else if (value <= 60) {
    return `bg-gradient-to-r from-yellow-200 to-yellow-500`;
  } else if (value <= 80) {
    return `bg-gradient-to-r from-orange-200 to-orange-500`;
  } else if (value <= 90) {
    return `bg-gradient-to-r from-orange-200 to-red-400`;
  } else {
    return `bg-gradient-to-r from-red-200 to-destructive`;
  }
};

export const CustomProgress = ({ control, customPriority }: { control: Control<z.infer<typeof GoalFormSchema>>, customPriority: number }) => {
  const initIsCustom = !(customPriority === PriorityEnum.LOW || customPriority === PriorityEnum.MEDIUM || customPriority === PriorityEnum.HIGH)
  const [isCustom, setIsCustom] = useState(initIsCustom); // Pour suivre si "Custom" est sélectionné
  const [customValue, setCustomValue] = useState(customPriority); // Valeur par défaut pour Custom

  const handleValueChange = (e: string, field: any) => {
    const priority = mapPriorityStringToInt(e);
    if (priority === PriorityEnum.CUSTOM) {
      setIsCustom(true);
      field.onChange(customValue); // Utiliser la valeur par défaut
    } else {
      setIsCustom(false);
      field.onChange(priority);
    }
  };

  const handleCustomValueChange = (value: number[], field: any) => {
    const newValue = value[0]; // Supposons que le slider retourne un tableau, on prend la première valeur
    setCustomValue(newValue);
    field.onChange(newValue);
  };
  // console.log([1].map(n => customValue));
  console.log([customValue])
  return (
    <FormField
      control={control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Priority</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-4">
              <Select
                defaultValue={PriorityEnum[field.value]}
                onValueChange={(e) => handleValueChange(e, field)}
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
              {isCustom && (
                <div className="flex flex-col gap-4">
                  <FormLabel htmlFor="customPriority">Custom Priority</FormLabel>

                  <Slider rangeColor={getSliderGradientClass(customValue)} value={[customValue]} step={5} max={100} onValueChange={(e) => handleCustomValueChange(e, field)}
                  //  style={{
                  //   "background": getSliderGradient(field.value)
                  // }} 

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