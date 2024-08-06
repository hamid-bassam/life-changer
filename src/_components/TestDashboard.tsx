
import { AppHeader } from "./AppHeader";
import { SideMenu } from "./NavigationMenu/SideMenu";
export function TestDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideMenu />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <AppHeader />
        <main >
          {children}
        </main>
      </div>
    </div >



  );
}