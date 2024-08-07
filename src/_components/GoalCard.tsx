"use client";
// import { PartialBlock } from '@blockGoa/core';
// import { useCreateBlockGoal } from '@blockGoa/react';
import { Goal } from '@prisma/client';
import { Card, CardDescription } from "../components/ui/card";


import { useState } from 'react';

export type GoalCardProps = {
  goal: Goal
};

export const GoalCard = async (props: GoalCardProps) => {

  const [isDeleting, setIsDeleting] = useState(false);


  return (
    <Card
      className="sm:col-span-2  max-h-64 overflow-y-auto" x-chunk="dashboard-05-chunk-0"
    >

      <CardDescription className='p-4'> <p>Yes we can </p></CardDescription>


    </Card>

  );
};