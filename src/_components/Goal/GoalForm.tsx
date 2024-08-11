import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { CustomGoalPriority } from "./CustomGoalPriority";
import { DescriptionField, DueDateField, GoalFormSchema, StatusField, TagInputType, TagsField, TitleField } from "./GoalInputUtils";


type GoalFormProps = {
  createOrEdit: 'create' | 'edit';
  form: UseFormReturn<z.infer<typeof GoalFormSchema>>;
  onSubmit: (data: z.infer<typeof GoalFormSchema>) => void;
  tags: TagInputType[];
  setTags: React.Dispatch<React.SetStateAction<TagInputType[]>>;
  isSubmitting: boolean;
};

export const GoalForm: React.FC<GoalFormProps> = ({ createOrEdit, form, onSubmit, tags, setTags, isSubmitting }) => {

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{createOrEdit === 'edit' ? "Edit Goal" : "Create a New Goal"}</CardTitle>
        <CardDescription>Fill out the details below to {createOrEdit === 'edit' ? "edit this goal" : "add a new goal"}.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pb-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();  // Empêche la soumission du formulaire via "Entrée"
              }
            }} className="w-full space-y-6 flex flex-col">
            <TitleField control={form.control} />
            <DescriptionField control={form.control} />
            <div className="grid max-sm:grid-cols-2 grid-cols-2 gap-4">
              <StatusField control={form.control} />
              <DueDateField control={form.control} />
              <CustomGoalPriority name="priority" customPriority={form.getValues('priority')} control={form.control} />
              <CustomGoalPriority name="importance" customPriority={form.getValues('importance')} control={form.control} />
            </div>
            <TagsField control={form.control} tags={tags} setTags={setTags} />
            <Button type="submit" className="ml-auto" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : createOrEdit === 'edit' ? "Update Goal" : "Create Goal"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter />
    </Card>
  );
};

