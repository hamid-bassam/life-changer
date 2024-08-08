"use client";
// import { PartialBlock } from '@blockGoa/core';
// import { useCreateBlockGoal } from '@blockGoa/react';
import { Goal as GoalType } from '@prisma/client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { BellRing, Edit, Ellipsis, Goal, GoalIcon, Paperclip, Plus, SquareCheckBig } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

// import MantineEditor from '../features/blocknote/MantineEditor';
import { useState } from 'react';
import { DescriptionScroll } from './description-scroll';

export type GoalCardProps = {
  goal: GoalType
};

export const GoalCard = async (props: GoalCardProps) => {

  const [isDeleting, setIsDeleting] = useState(false);
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


  return (

    <Card className="px-4 py-2 shadow-md rounded-md sm:col-span-2  " x-chunk="dashboard-05-chunk-0">
      <CardHeader>
        <CardTitle><span className='flex items-center gap-2'><Goal /> realisation d&apos;app web</span> </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div className=" flex items-center  space-x-4 rounded-md border p-4 ">

          <DescriptionScroll description={description} />
        </div>

        <div className='inline-flex gap-2'>

          <Badge>Projects</Badge>
          <Badge variant={'secondary'} className='bg-secondary'>Dev</Badge>
        </div>
        <Progress value={1} />

        {/* <div className=' min-w-full bg-transparent nowheel nodrag  ' style={{ overflow: 'auto' }}>
          <MantineEditor />
        </div> */}
      </CardContent>
      <CardFooter>
        <div className='flex relative flex-col gap-2 w-full'>

          {/* <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button> */}
          <TooltipProvider>
            <div className='flex w-full gap-1'>

              <div className='flex-1 mr-auto '></div>

              <Button variant="outline" disabled><Paperclip size={15} /></Button>

              <Tooltip >
                <TooltipTrigger>
                  <Button variant="outline"><Edit size={15} /></Button>
                </TooltipTrigger>
                <TooltipContent className='bg-popover text-primary'>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline"><Plus size={15} /></Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className={`flex  items-center `}>

                  <Tooltip >
                    <TooltipTrigger>
                      <DropdownMenuItem className='p-0'>
                        <Button variant='ghost' className=''>
                          <GoalIcon size={15} />
                        </Button>
                      </DropdownMenuItem>
                    </TooltipTrigger>
                    <TooltipContent className='bg-popover text-primary'>
                      <p>Add a goal</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip >
                    <TooltipTrigger>
                      <DropdownMenuItem className='p-0'>
                        <Button variant='ghost' className=''>
                          <SquareCheckBig size={15} />
                        </Button>
                      </DropdownMenuItem>
                    </TooltipTrigger>
                    <TooltipContent className='bg-popover text-primary'>
                      <p>Add a Task</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuItem className='p-0 '>
                    <Button variant='ghost'>
                      <Ellipsis size={15} />
                    </Button>
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TooltipProvider>
        </div>
      </CardFooter>

    </Card>


  );
};