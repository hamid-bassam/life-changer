"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeVariant, Goal as GoalType, Prisma, Tag } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";
import { toast as toastSonner } from 'sonner';
import { z } from "zod";
import { createGoal } from "../../actions/actions";
import { cn } from "../../lib/utils";
import { TagsInput } from "../TagsInput";



export type GoalInputProps = {
  goal?: (GoalType & { tags: Tag[] }) | null;
  userId?: string;
};
const GoalFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"], {
    required_error: "You need to select a status.",
  }),
  priority: z.number().min(1).max(5),
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

export type TagInputType = { name: string, color?: string, variant?: BadgeVariant };
export function GoalInput(props: GoalInputProps) {

  const form = useForm<z.infer<typeof GoalFormSchema>>({
    resolver: zodResolver(GoalFormSchema),

    defaultValues: {
      title: "",
      description: "",
      status: "pending",  // Default status
      priority: 3,        // Default priority
      tags: [],           // Default tags
    },

  });

  const [tags, setTags] = useState<TagInputType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    form.setValue("tags", tags);
  }, [tags, form]);
  async function onSubmit(data: z.infer<typeof GoalFormSchema>) {
    if (!props.userId) {

      toastSonner.error('Error', {
        description: "User ID is required to create a goal",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { title, description, status, priority, dueDate } = form.getValues();

      const datax: Prisma.GoalCreateInput = {
        title,
        description,
        status,
        priority,
        dueDate,
        isChild: false,
        user: { connect: { id: props.userId } },
      };

      const tagData = tags.map(tag => ({
        name: tag.name,
        color: tag.color || "bg-primary",
        variant: tag.variant,
      }));

      await createGoal(datax, tagData);



      toastSonner.success('Success', {
        description: "Goal created successfully!",
      });
    } catch (error) {
      console.error("Failed to create goal:", error);

      toastSonner.error('Error', {
        description: "Failed to create goal. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  // async function onSubmit(data: z.infer<typeof GoalFormSchema>) {
  //   if (!props.userId) {
  //     throw new Error("User ID is required to create a goal");
  //   }
  //   setIsSubmitting(true);
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });

  //   const { title, description, status, priority, dueDate } = form.getValues();

  //   const datax: Prisma.GoalCreateInput = {
  //     title,
  //     description,
  //     status,
  //     priority,
  //     dueDate,
  //     isChild: false,
  //     user: { connect: { id: props.userId } },
  //   };
  //   const tagData = tags.map(tag => ({
  //     name: tag.name,
  //     color: tag.color || "bg-primary",
  //     variant: tag.variant,  // Use the mapping function
  //   }));

  //   await createGoal(datax, tagData);
  //   setIsSubmitting(false);

  // }
  return (

    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create a New Goal</CardTitle>
        <CardDescription>Fill out the details below to add a new goal.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pb-0">
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col ">
            <TitleField control={form.control} />
            <DescriptionField control={form.control} />
            <div className="grid max-sm:grid-cols-2 grid-cols-2 gap-4">
              <StatusField control={form.control} />
              <PriorityField control={form.control} />
            </div>
            <DueDateField control={form.control} />
            <TagsField control={form.control} tags={tags} setTags={setTags} />
            <Button type="submit" className="ml-auto" disabled={isSubmitting}>
              {isSubmitting ? "saving ... " : "Create Goal"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>

  )
}

const TitleField = ({ control }: { control: Control<z.infer<typeof GoalFormSchema>> }) => (
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

const DescriptionField = ({ control }: { control: Control<z.infer<typeof GoalFormSchema>> }) => (
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

const StatusField = ({ control }: { control: Control<z.infer<typeof GoalFormSchema>> }) => (
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

const PriorityField = ({ control }: { control: Control<z.infer<typeof GoalFormSchema>> }) => (
  <FormField
    control={control}
    name="priority"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Priority</FormLabel>
        <FormControl>
          <Select onValueChange={(e) => field.onChange(e === 'low' ? 1 : e === 'medium' ? 3 : e === 'high' ? 5 : 0)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const DueDateField = ({ control }: { control: Control<z.infer<typeof GoalFormSchema>> }) => (
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

type TagsFieldProps = {
  control: Control<z.infer<typeof GoalFormSchema>>;
  tags: TagInputType[];
  setTags: React.Dispatch<React.SetStateAction<TagInputType[]>>;
};

const TagsField = (props: TagsFieldProps) => (
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