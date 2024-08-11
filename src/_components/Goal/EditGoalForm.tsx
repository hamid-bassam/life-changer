"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Goal as GoalType, Prisma, Tag } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { editGoal } from "../../actions/actions";
import { GoalForm } from "./GoalForm";
import { GoalFormSchema, PriorityEnum, TagInputType } from "./GoalInputUtils";

export function EditGoalForm({ goalId, goal }: { goalId: string, goal: (GoalType & { tags: Tag[] }) | null }) {

  const form = useForm<z.infer<typeof GoalFormSchema>>({
    resolver: zodResolver(GoalFormSchema),

    defaultValues: {
      title: goal?.title || "",
      description: goal?.description || "",
      status: goal?.status as "pending" | "in-progress" | "completed" || "pending",  // Default status
      priority: goal?.priority || PriorityEnum.MEDIUM,        // Default priority
      dueDate: goal?.dueDate || undefined,
      tags: goal?.tags.map(tag => ({
        name: tag.name || undefined,
        color: tag.color || undefined,
        variant: tag.variant || undefined,
      })) || [],
    },

  });

  const [tags, setTags] = useState<TagInputType[]>(form.getValues('tags') || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: z.infer<typeof GoalFormSchema>) => {
    try {
      setIsSubmitting(true);

      const goalDto: Prisma.GoalUpdateInput = {
        ...data,
        tags: undefined,
      };

      const tagData = tags.map(tag => ({
        name: tag.name,
        color: tag.color,
        variant: tag.variant,
      }));

      await editGoal(goalId, goalDto, tagData);

      toast.success('Success', {
        description: "Goal updated successfully!",
      });
    } catch (error) {
      console.error("Failed to update goal:", error);
      toast.error('Error', {
        description: "Failed to update goal. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }


  };

  return (
    <GoalForm createOrEdit="edit" form={form} onSubmit={onSubmit} tags={tags} setTags={setTags} isSubmitting={isSubmitting} />
  );
}