import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LineChart } from 'lucide-react';
import Link from 'next/link';
export const OverViewTooltip = () => {

  return (

    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary  md:h-8 md:w-8"
        >
          <LineChart className="h-5 w-5" />
          <span className="sr-only">OverView</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">OverView</TooltipContent>
    </Tooltip>
  );
};