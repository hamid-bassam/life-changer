"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeVariant, Goal as GoalType, Prisma, Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { editGoalV2 } from "../../actions/actions";
import { useGoalCreateStore } from "../../stores/goal-create-store";
import { GoalForm } from "./GoalForm";
import { GoalFormSchema, PriorityEnum, SubGoalInputType, TagInputType } from "./GoalInputUtils";

export function EditGoalForm({ goalId, goal }: { goalId: string, goal: (GoalType & { tags: Tag[] } & { subGoals: (GoalType & { tags: Tag[] })[] }) | null }) {

  const { subGoals: z_subgoals, setTags: z_setTags, setSubGoals: z_setSubGoals } = useGoalCreateStore();
  console.log("goal from page [id]", goal);

  const form = useForm<z.infer<typeof GoalFormSchema>>({
    resolver: zodResolver(GoalFormSchema),

    defaultValues: {
      title: goal?.title || "",
      description: goal?.description || "",
      status: goal?.status as "pending" | "in-progress" | "completed" || "pending",  // Default status
      priority: goal?.priority || PriorityEnum.MEDIUM,
      importance: goal?.importance || PriorityEnum.MEDIUM,   // Default priority
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

  useEffect(() => {
    if (z_subgoals.length === 0) {
      const subGoals: SubGoalInputType[] = goal?.subGoals.map(subGoal => ({
        id: subGoal.id,
        importance: subGoal.importance,
        priority: subGoal.priority,
        status: subGoal.status as "pending" | "in-progress" | "completed" || "pending",
        title: subGoal.title,
        description: subGoal.description || undefined,
        dueDate: subGoal.dueDate || undefined,
        tags: subGoal.tags.map(tag => ({
          name: tag.name as string || "",
          color: tag.color as string || undefined,
          variant: tag.variant as BadgeVariant || null,
        })) || [],
      })) || [];

      z_setSubGoals(subGoals);

    }
  }, [z_subgoals, z_setSubGoals, goal?.subGoals]);

  const onSubmit = async (data: z.infer<typeof GoalFormSchema>) => {
    try {
      setIsSubmitting(true);

      const goalDto: Prisma.GoalUpdateInput = {
        ...data,
        user: { connect: { id: goal?.userId } },
        tags: undefined,
        subGoals: undefined,
      };
      console.log("goalDto", goalDto);
      const tagData = tags.map(tag => ({
        name: tag.name,
        color: tag.color,
        variant: tag.variant,
      }));

      await editGoalV2(goalId, goalDto, tagData, z_subgoals);

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