"use client";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
} from "../components/ui/form";
import { HierarchicalItem } from "../types/hierarchy";
import Tree from "./Tree";

type GenericFormProps = {
  tree: HierarchicalItem[];
};
const ChildItemSchema = z.object({
  id: z.string().uuid(), // ou z.string() si l'identifiant n'est pas un UUID
  title: z.string().min(1, { message: "Child title is required" }),
  depth: z.number().min(-1).optional(),
  importance: z.number().min(1).max(100),
  parentId: z.string().uuid().optional(),
  type: z.enum(["goal", "task", "note"]),

});

export const GenericFormSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, { message: "Title is required" }),
  children: z.array(ChildItemSchema).optional(),
  status: z.string().optional(),
  depth: z.number().min(0).optional(),
  importance: z.number().min(1).max(100),
  parentId: z.string().uuid().optional(),
  type: z.enum(["goal", "task", "note"]),
});
// export const GenericForm = ({ tree }: { tree: HierarchicalItem[] }) => {
const GenericForm: React.FC<GenericFormProps> = ({ tree }) => {
  const [selectedParent, setSelectedParent] = useState<HierarchicalItem | null>(null);
  const handleSelect = (item: HierarchicalItem) => {

    setSelectedParent(item);
    // set values of the form
    form.setValue("parentId", item.id);
    form.setValue("depth", item.depth ?? -1);
    form.setValue("importance", item.importance || 99);
    form.setValue("type", item.type);
    form.setValue("id", item.id);
    form.setValue("title", item.title);
    form.setValue("status", item.status || "pending");





  };


  const onSubmit = (values: z.infer<typeof GenericFormSchema>) => {
    // const { title, description, status, dueDate, tags } = values;
    console.log('Selected Parent:', selectedParent);
    // Logique de soumission du formulaire
  };

  const form = useForm<z.infer<typeof GenericFormSchema>>({
    resolver: zodResolver(GenericFormSchema),
    defaultValues: {
      title: "",
      status: "pending",
      importance: 99,
      type: "goal",
      id: "",
      parentId: "",
      depth: -1,
      children: [],

    },
  });


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2>Select Parent item</h2>
          <Tree items={tree} onSelect={handleSelect} />
          {selectedParent && <p>Selected Parent: {selectedParent.title}</p>}
          <Button type="submit">Submit</Button>
        </form>
      </Form >

      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form> */}
    </>
  );
};

export default GenericForm;


