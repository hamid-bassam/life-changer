

import { Edit, Ellipsis, GoalIcon, Paperclip, Plus, SquareCheckBig } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';
export const GoalCardToolTip = () => {

  return (
    <div className='flex relative flex-col gap-2 w-full'>
      <TooltipProvider>
        <div className='flex w-full gap-1'>

          <div className='flex-1 mr-auto '></div>

          <Button variant="outline" disabled><Paperclip size={15} /></Button>

          <Tooltip >
            <TooltipTrigger>
              <Button variant="outline"><Edit size={15} /></Button>
            </TooltipTrigger>
            <TooltipContent className='bg-muted-foreground text-muted '>
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
                <TooltipContent className='bg-muted-foreground text-muted '>
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
                <TooltipContent className='bg-muted-foreground text-muted '>
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
  );
};