

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Goal as GoalType } from '@prisma/client';
import { Goal } from 'lucide-react';
import { DescriptionScroll } from './description-scroll';
import { GoalCardToolTip } from './GoalCardToolTip';

export type GoalCardProps = {
  goal: GoalType
};

export const GoalCard = async (props: GoalCardProps) => {

  return (

    <Card className="px-4 py-2 shadow-md rounded-md sm:col-span-2  " x-chunk="dashboard-05-chunk-0">
      <CardHeader>
        <CardTitle><span className='flex items-center gap-2'><Goal /> realisation d&apos;app web</span> </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">

        <div className=" flex items-center  space-x-4 rounded-md border p-4 ">

          <DescriptionScroll description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />
        </div>

        <div className='inline-flex gap-2'>

          <Badge>Projects</Badge>
          <Badge variant={'secondary'} className='bg-secondary'>Dev</Badge>
        </div>
        <Progress value={1} />
      </CardContent>
      <CardFooter>

        <GoalCardToolTip />

      </CardFooter>

    </Card>


  );
};