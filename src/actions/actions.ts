"use server";
import { BadgeVariant, Prisma } from "@prisma/client";

import { revalidatePath } from "next/cache";
import { SubGoalInputType, TagInputType } from "../_components/Goal/GoalInputUtils";
import prisma from "../lib/prisma";
import { HierarchicalItem, ItemType } from "../types/hierarchy";

export async function createNote(data: Prisma.NoteCreateManyInput) {
  const note = await prisma.note.create({
    data: data
  });
  revalidatePath(`/notes`);
  return note;
}

export async function editNote(
  id: string,
  data: Prisma.NoteUpdateInput
) {
  const note = await prisma.note.update({
    where: { id: id },
    data: data
  });
  revalidatePath(`/notes`);
  return note;
}

export async function deleteNote(
  id: string
) {
  await prisma.note.delete({
    where: { id: id }
  });
  revalidatePath(`/notes`);

}

export async function createGoal(data: Prisma.GoalCreateInput, tags: TagInputType[], subGoals: SubGoalInputType[]) {
  const goal = await prisma.goal.create({
    data: {
      ...data,

      tags: {
        connectOrCreate: tags.map(tag => ({
          where: {
            name_color_variant: {
              name: tag.name,
              color: tag.color || "",
              variant: tag.variant || BadgeVariant.DEFAULT,
            },
          },
          create: {
            name: tag.name,
            color: tag.color,
            variant: tag.variant,
          },
        })),
      },
      subGoals: subGoals && {
        create: subGoals.map(subGoal => ({
          ...subGoal,
          user: data.user,
          depth: (data.depth ?? 0) + 1,
          tags: {
            connectOrCreate: subGoal.tags && subGoal.tags.map(tag => ({
              where: {
                name_color_variant: {
                  name: tag.name,
                  color: tag.color || "",
                  variant: tag.variant || BadgeVariant.DEFAULT,
                },
              },
              create: {
                name: tag.name,
                color: tag.color,
                variant: tag.variant,
              },
            })),
          },
        }))
      }
    },

  });
  revalidatePath(`/goals`);
  return goal;
}

export async function editGoal(
  id: string,
  data: Prisma.GoalUpdateInput,
  tags: TagInputType[]
) {
  const goal = await prisma.goal.update({
    where: { id: id },
    data: {
      ...data,
      tags: {
        // Disconnect all existing tags first (optional, depending on desired behavior)
        set: [],
        // Then connect or create new tags
        connectOrCreate: tags.map(tag => ({
          where: {
            name_color_variant: {
              name: tag.name,
              color: tag.color || "",
              variant: tag.variant || BadgeVariant.DEFAULT,
            },
          },
          create: {
            name: tag.name,
            color: tag.color,
            variant: tag.variant
          },
        })),
      }
    },
  });
  revalidatePath(`/goals`);
  return goal;
}

export async function deleteGoal(
  id: string
) {
  await prisma.goal.delete({
    where: { id: id },
  });
  revalidatePath(`/goals`);

}

export async function createTask(
  data: Prisma.TaskCreateInput,
  parentgoal: { connect: { id: string } },
  tags: Prisma.TagCreateManyInput[]
) {
  const task = await prisma.task.create({
    data: {
      ...data,
      goal: parentgoal,
      tags: {
        connectOrCreate: tags?.map(tag => ({
          where: {
            name_color_variant: {
              name: tag.name,
              color: tag.color || "bg-primary",
              variant: tag.variant || BadgeVariant.DEFAULT,
            },
          },
          create: {
            name: tag.name,
            color: tag.color || "bg-primary",
            variant: tag.variant || BadgeVariant.DEFAULT,
          },
        })),
      }
    }
    ,
  });
  revalidatePath(`/tasks`);
  return task;
}

export async function editTask(
  id: string,
  data: Prisma.TaskUpdateInput
) {
  const task = await prisma.task.update({
    where: { id: id },
    data: data
  });
  revalidatePath(`/tasks`);
  return task;
}

export async function deleteTask(
  id: string
) {
  await prisma.task.delete({
    where: { id: id }
  });
  revalidatePath(`/tasks`);

}

/** 
 * get goals and transform them into a hierarchical structure
 * 
 * 
 * 
 *  */

async function getGoals(): Promise<HierarchicalItem[]> {
  const goals = await prisma.goal.findMany({
    select: {
      id: true,
      title: true,
      parentGoalId: true,
      depth: true,
      status: true,
      importance: true,
      // Ajoutez d'autres champs nécessaires
    },
  });

  // Cast manuel des éléments vers le type Goal
  return goals.map(goal => ({
    ...goal,
    type: ItemType.GOAL,      // Ajout du type spécifique à chaque goal
    children: [],             // Initialiser les enfants comme un tableau vide
    parentId: goal.parentGoalId || undefined,
  }));
}

async function getTasks(): Promise<HierarchicalItem[]> {
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      goalId: true,
      parentTaskId: true,
      depth: true,
      importance: true,
      // Ajoutez d'autres champs nécessaires
    },
  });

  // Cast manuel des éléments vers le type Task
  return tasks.map(task => ({
    ...task,
    type: ItemType.TASK,      // Ajout du type spécifique à chaque task
    children: [],             // Initialiser les enfants comme un tableau vide
    parentId: task.goalId || task.parentTaskId || undefined,
  }));
}

async function getNotes(): Promise<HierarchicalItem[]> {
  const notes = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      taskId: true,
      goalId: true,
      // Ajoutez d'autres champs nécessaires
    },
  });

  // Cast manuel des éléments vers le type Note
  return notes.map(note => ({
    ...note,
    type: ItemType.NOTE,
    status: undefined,    // Ajout du type spécifique à chaque note
    // children: [],             // Initialiser les enfants comme un tableau vide
    parentId: note.taskId || note.goalId || undefined,
  }));
}

export async function getHierarchicalItems(): Promise<HierarchicalItem[]> {
  const goals = await getGoals();
  const tasks = await getTasks();
  const notes = await getNotes();


  const items: HierarchicalItem[] = [
    ...goals,
    ...tasks.map(task => ({ ...task, type: ItemType.TASK })),
    ...notes.map(note => ({ ...note, type: ItemType.NOTE })),
  ];

  return items;
}


