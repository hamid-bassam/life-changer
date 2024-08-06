import { Goal, Home, LineChart, PanelLeft, PenSquare, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { LifeChangerLink } from "../NavigationMenu/LifeChangerLink";
export const BurgerMenu = () => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <LifeChangerLink className="w-full shrink-0 flex items-center gap-2 rounded-full  text-lg font-semibold text-secondary md:text-base" >
            Life Changer
          </LifeChangerLink>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5  hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5  hover:text-foreground"
          >
            <PenSquare className="h-5 w-5" />
            Notes
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5  hover:text-foreground"
          >
            <Goal className="h-5 w-5" />
            Goals
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5  hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            OverView
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5  hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};