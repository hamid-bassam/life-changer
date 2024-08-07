"use client"
import logo from '@/assets/lifeChangerLogo.png';
import { Goal, Home, LineChart, PanelLeft, PenSquare, Settings } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";

export const BurgerMenu = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const handleLinkTouch = (e: React.TouchEvent, path: string) => {
    setIsSheetOpen(false); // Fermer le Sheet
    router.push(path); // Rediriger vers le chemin souhaité
  };
  return (


    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>


      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">

          <Link
            href="/dashboard"
            className="w-full shrink-0 flex items-center gap-2 rounded-full  text-lg font-semibold text-secondary md:text-base"
            onTouchEnd={(e) => handleLinkTouch(e, '/dashboard')}
          >
            <Image src={logo.src} className=" transition-all group-hover:scale-110 " alt="LifeChanger" width={40}
              height={40} />
            Life Changer
          </Link >
          <Link
            href="/dashboard"
            className="flex items-center gap-4 px-2.5  hover:text-foreground"
            onTouchEnd={(e) => handleLinkTouch(e, '/dashboard')}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/notes"
            className="flex items-center gap-4 px-2.5  hover:text-foreground"
            onTouchEnd={(e) => handleLinkTouch(e, '/dashboard/notes')}
          >
            <PenSquare className="h-5 w-5" />
            Notes
          </Link>
          <Link
            href="/dashboard/goals"
            className="flex items-center gap-4 px-2.5  hover:text-foreground"
            onTouchEnd={(e) => handleLinkTouch(e, '/dashboard/goals')}
          >
            <Goal className="h-5 w-5" />
            Goals
          </Link>
          <Link
            href="/dashboard/overview"
            className="flex items-center gap-4 px-2.5  hover:text-foreground"
            onTouchEnd={(e) => handleLinkTouch(e, '/dashboard/overview')}
          >
            <LineChart className="h-5 w-5" />
            OverView
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-4 px-2.5  hover:text-foreground"
            onTouchEnd={(e) => handleLinkTouch(e, '/dashboard/settings')}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};