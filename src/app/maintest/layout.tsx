
import { ReactNode } from "react";
import { AppHeader } from "../../_components/Header/AppHeader";
import { SideMenu } from "../../_components/NavigationMenu/SideMenu";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideMenu />
      <div className="flex flex-col flex-grow sm:gap-4 sm:py-4 sm:pl-14">
        <AppHeader />
        <main className="flex flex-col flex-grow">{children}</main>
      </div >
    </div >

  )
}