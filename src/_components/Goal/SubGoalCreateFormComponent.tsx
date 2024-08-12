"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';

import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Button } from '../../components/ui/button';
import { Form } from '../../components/ui/form';
import { useGoalCreateStore } from '../../stores/goal-create-store';
import { CustomGoalPriority } from './CustomGoalPriority';
import { DescriptionField, DueDateField, GoalFormSchema, PriorityEnum, StatusField, SubGoalFormSchema, SubGoalInputType, TagInputType, TagsField, TitleField } from './GoalInputUtils';

export type SubGoalCreateFormComponentProps = {
  subGoals: SubGoalInputType[];
  setSubGoals: React.Dispatch<React.SetStateAction<SubGoalInputType[]>>;
  form: UseFormReturn<z.infer<typeof GoalFormSchema>>;
};

export const SubGoalCreateFormComponent = () => {
  const addSubGoal = useGoalCreateStore((state) => state.addSubGoal);
  const subGoalForm = useForm<z.infer<typeof SubGoalFormSchema>>({
    resolver: zodResolver(SubGoalFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      priority: PriorityEnum.MEDIUM,
      importance: PriorityEnum.MEDIUM,
      dueDate: undefined,
      tags: [],
    },
  });
  const [tags, setTags] = useState<TagInputType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: z.infer<typeof SubGoalFormSchema>) => {
    console.log('SubGoal Data from 2nd:', data);
    addSubGoal(data); // Ajouter le sous-objectif au store Zustand
    subGoalForm.reset();

  };

  return (
    <Form {...subGoalForm}>
      <form
        onSubmit={subGoalForm.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();  // Empêche la soumission du formulaire via "Entrée"
          }
        }}
        className="w-full space-y-6 flex flex-col"
      >
        <TitleField control={subGoalForm.control} />
        <DescriptionField control={subGoalForm.control} />
        <Accordion type="single" defaultValue="acc-1" collapsible>
          <AccordionItem value="acc-1">
            <AccordionTrigger>Advanced Settings</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">

                <div className="grid max-sm:grid-cols-2 grid-cols-2 gap-4">
                  <StatusField control={subGoalForm.control} />
                  <DueDateField control={subGoalForm.control} />
                  <CustomGoalPriority name="priority" customPriority={subGoalForm.getValues('priority')} control={subGoalForm.control} />
                  <CustomGoalPriority name="importance" customPriority={subGoalForm.getValues('importance')} control={subGoalForm.control} />
                </div>
                <TagsField control={subGoalForm.control} tags={tags} setTags={setTags} />
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
          Submit sub goal
        </Button>
      </form>
    </Form>
  );
}