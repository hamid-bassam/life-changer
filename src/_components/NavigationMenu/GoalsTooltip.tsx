import { Goal } from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
export const GoalsTooltip = () => {

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary  md:h-8 md:w-8"
        >
          <Goal className="h-5 w-5" />
          <span className="sr-only">Goals</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Goals</TooltipContent>
    </Tooltip>
  );
};