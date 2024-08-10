"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BadgeVariant, Goal as GoalType, Tag } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { cn } from "../../lib/utils";
import { TagsInput } from "../TagsInput";



export type GoalInputProps = {
  goal?: (GoalType & { tags: Tag[] }) | null;
  userId?: string;
};


export const GoalFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"], {
    required_error: "You need to select a status.",
  }),
  priority: z.number().min(0).max(100),
  dueDate: z.date().min(new Date()).optional(),
  badges: z.string().optional(),
  tags: z.array(
    z.object({
      name: z.string(),
      color: z.string().optional(),
      variant: z.enum(["DEFAULT", "OUTLINE", "SECONDARY", "DESTRUCTIVE"]).optional(),

    })
  ).optional(),
});

export type TagInputType = {
  name: string,
  color?: string,
  variant?: BadgeVariant
};

export enum PriorityEnum {
  HIGH = 95,
  MEDIUM = 50,
  LOW = 5,
  CUSTOM = 0
}



export const TitleField = ({ control }: { control: Control<z.infer<typeof GoalFormSchema>> }) => (
  <FormField
    control={control}
    name="title"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input placeholder="Title" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const DescriptionField = ({ control }: { control: Control<z.infer<typeof GoalFormSchema>> }) => (
  <FormField
    control={control}
    name="description"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea placeholder="Provide a description (optional)" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const StatusField = ({ control }: { control: Control<z.infer<typeof GoalFormSchema>> }) => (
  <FormField
    control={control}
    name="status"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Status</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// ==============================================================================================
export const mapPriorityStringToInt = (priority: string): PriorityEnum => {
  switch (priority) {
    case 'LOW':
      return PriorityEnum.LOW;
    case 'MEDIUM':
      return PriorityEnum.MEDIUM;
    case 'HIGH':
      return PriorityEnum.HIGH;
    default:
      return PriorityEnum.CUSTOM;
  }
};

export const mapPriorityIntToString = (priority: PriorityEnum): string => {
  switch (priority) {
    case PriorityEnum.LOW:
      return 'LOW';
    case PriorityEnum.MEDIUM:
      return 'MEDIUM';
    case PriorityEnum.HIGH:
      return 'HIGH';
    default:
      return 'CUSTOM';
  }
};

export const PriorityField = ({ control }: { control: Control<z.infer<typeof GoalFormSchema>> }) => {

  return (
    <FormField
      control={control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Priority</FormLabel>
          <FormControl>
            <Select defaultValue={PriorityEnum[field.value]} onValueChange={(e) => field.onChange(mapPriorityStringToInt(e))}
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

          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}





// =====================================================================

export const DueDateField = ({ control }: { control: Control<z.infer<typeof GoalFormSchema>> }) => (
  <FormField
    control={control}
    name="dueDate"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Due Date</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal col-span-2 ",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) =>
                date < new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);

export type TagsFieldProps = {
  control: Control<z.infer<typeof GoalFormSchema>>;
  tags: TagInputType[];
  setTags: React.Dispatch<React.SetStateAction<TagInputType[]>>;
};

export const TagsField = (props: TagsFieldProps) => (
  <FormField
    control={props.control}
    name="tags"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Badges</FormLabel>
        <FormControl>
          <TagsInput
            tags={props.tags}
            setTags={(newTags) => {
              props.setTags(newTags);
              field.onChange(newTags || []);
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);