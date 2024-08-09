

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Goal as GoalType, Tag } from '@prisma/client';
import { Goal } from 'lucide-react';
import { deleteGoal } from '../../actions/actions';
import { cn } from '../../lib/utils';
import { Delete } from '../Delete';
import { DescriptionScroll } from './description-scroll';
import { GoalCardToolTip } from './GoalCardToolTip';

export type GoalCardProps = {
  goal: GoalType & { tags: Tag[] };
};
const tsp = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
export const GoalCard = async (props: GoalCardProps) => {

  return (

    <Card className="px-4 py-2 shadow-md rounded-md sm:col-span-2 flex flex-col h-full" x-chunk="dashboard-05-chunk-0">
      <CardHeader>
        <CardTitle><span className='flex items-center gap-2'><Goal />{props.goal.title}</span> </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 flex-grow">


        {props.goal.description ?
          <div className=" flex items-center  space-x-4 rounded-md border p-4 ">
            <DescriptionScroll description={props.goal.description} />
          </div>
          : null}

        <div className='inline-flex gap-2'>
          {props.goal.tags.map(tag => (
            <Badge key={tag.id} variant={tag.variant?.toLowerCase() as "default" | "outline" | "secondary" | "destructive" ?? "default"} className={cn(tag.color, "h-5")}>{tag.name}</Badge>
          ))}
          <Badge className='h-5'>Projects</Badge>
          <Badge variant={'secondary'} className='bg-secondary h-5'>Dev</Badge>
        </div>
        <Progress value={1} />
      </CardContent>
      <CardFooter className='mt-auto' >


        <Delete id={props.goal.id} deleteAction={deleteGoal} message={`Are you sure you want to delete this goal?`} title={props.goal.title} />
        <GoalCardToolTip />


      </CardFooter>

    </Card>


  );
};