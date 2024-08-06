import { TooltipProvider } from '@/components/ui/tooltip';
import { BottomNavMenu } from "./BottomNavMenu";
import { TopNavMenu } from "./TopNavMenu";
export const SideMenu = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <TopNavMenu />
        <BottomNavMenu />
      </TooltipProvider>
    </aside>
  )
    ;
};

