import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PenSquare } from 'lucide-react';
import Link from 'next/link';
export const NotesTooltip = () => {

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/dashboard/notes"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary   md:h-8 md:w-8"
        >
          <PenSquare className="h-5 w-5" />
          <span className="sr-only">Notes</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Notes</TooltipContent>
    </Tooltip>
  );
};