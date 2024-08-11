"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast as toastSonner } from 'sonner';
import { z } from "zod";
import { createGoal } from "../../actions/actions";
import { GoalForm } from "./GoalForm";
import { GoalFormSchema, PriorityEnum, TagInputType } from "./GoalInputUtils";


export function CreateGoalForm({ userId, parentGoal }: { userId: string, parentGoal: { id: string, depth: number } | null }) {

  const searchParams = useSearchParams();   //create or update goal id
  console.log("parent", parentGoal?.id);
  console.log("parent depth", parentGoal?.depth);

  const form = useForm<z.infer<typeof GoalFormSchema>>({
    resolver: zodResolver(GoalFormSchema),
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

  const onSubmit = async (data: z.infer<typeof GoalFormSchema>) => {

    try {
      setIsSubmitting(true);
      const goalDto: Prisma.GoalCreateInput = {
        ...data,
        user: { connect: { id: userId } },
        isChild: Boolean(searchParams.get("parentId")),
        parentGoal: parentGoal?.id ? { connect: { id: parentGoal.id } } : undefined,
        depth: parentGoal?.depth || parentGoal?.depth === 0 ? parentGoal.depth + 1 : 0,
        // parentGoal: searchParams.get("parentId")
        //   ? { connect: { id: searchParams.get("parentId") || undefined } }
        //   : undefined,

        tags: undefined
      };

      const tagData = tags.map(tag => ({
        name: tag.name,
        color: tag.color,
        variant: tag.variant,
      }));
      console.log("data xx ", goalDto);
      await createGoal(goalDto, tagData);

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


  };

  return (
    <GoalForm createOrEdit='create' form={form} onSubmit={onSubmit} tags={tags} setTags={setTags} isSubmitting={isSubmitting} />
  );
}