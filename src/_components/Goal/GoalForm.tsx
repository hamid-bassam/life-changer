import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { CustomGoalPriority } from "./CustomGoalPriority";
import { DescriptionField, DueDateField, GoalFormSchema, StatusField, TagInputType, TagsField, TitleField } from "./GoalInputUtils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SubGoalCreateFormComponent } from "./SubGoalCreateFormComponent";


type GoalFormProps = {
  createOrEdit: 'create' | 'edit';
  form: UseFormReturn<z.infer<typeof GoalFormSchema>>;

  onSubmit: (data: z.infer<typeof GoalFormSchema>) => void;
  tags: TagInputType[];
  setTags: React.Dispatch<React.SetStateAction<TagInputType[]>>;


  isSubmitting: boolean;

};

export const GoalForm: React.FC<GoalFormProps> = ({ createOrEdit, form: goalForm, onSubmit, tags, setTags, isSubmitting }) => {


  return (
    <div className="grid max-sm:grid-cols-1 grid-cols-3 gap-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{createOrEdit === 'edit' ? "Edit Goal" : "Create a New Goal"}</CardTitle>
          <CardDescription>Fill out the details below to {createOrEdit === 'edit' ? "edit this goal" : "add a new goal"}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-0">
          <Form {...goalForm}>
            <form
              onSubmit={goalForm.handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();  // Empêche la soumission du formulaire via "Entrée"
                }
              }} className="w-full space-y-6 flex flex-col">
              <TitleField control={goalForm.control} />
              <DescriptionField control={goalForm.control} />
              <Accordion type="single" defaultValue="acc-1" collapsible>
                <AccordionItem value="acc-1">
                  <AccordionTrigger>Advanced Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4">

                      <div className="grid max-sm:grid-cols-2 grid-cols-2 gap-4">
                        <StatusField control={goalForm.control} />
                        <DueDateField control={goalForm.control} />
                        <CustomGoalPriority name="priority" customPriority={goalForm.getValues('priority')} control={goalForm.control} />
                        <CustomGoalPriority name="importance" customPriority={goalForm.getValues('importance')} control={goalForm.control} />
                      </div>
                      <TagsField control={goalForm.control} tags={tags} setTags={setTags} />

                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* <div className="grid max-sm:grid-cols-2 grid-cols-2 gap-4">
              <StatusField control={form.control} />
              <DueDateField control={form.control} />
              <CustomGoalPriority name="priority" customPriority={form.getValues('priority')} control={form.control} />
              <CustomGoalPriority name="importance" customPriority={form.getValues('importance')} control={form.control} />
            </div>
            <TagsField control={form.control} tags={tags} setTags={setTags} /> */}
              <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : createOrEdit === 'edit' ? "Update Goal" : "Create Goal"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter />
      </Card>
      <Card className="w-full ">
        <DropdownMenu modal={false} >
          <DropdownMenuTrigger asChild>
            <CardHeader >
              <Button > Open </Button>
            </CardHeader>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-sm:w-[90vw] overflow-y-scroll max-h-[60vh] ">
            <CardContent className="space-y-4 pb-0">
              <SubGoalCreateFormComponent />
            </CardContent>
          </DropdownMenuContent>
        </DropdownMenu>

        <CardFooter />
      </Card>
    </div>
  );
};

