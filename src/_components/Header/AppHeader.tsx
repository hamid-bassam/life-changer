
import { ThemeToggle } from "../../features/theme/ThemeToggle";
import { AvatarMenu } from "./AvatarMenu";
import { BreadCrumbNavigation } from "./BreadCrumbNavigation";
import { BurgerMenu } from "./BurgerMenu";
import { SearchBar } from "./SearchBar";
export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <BurgerMenu />
      <BreadCrumbNavigation />
      <SearchBar />
      <ThemeToggle />
      <AvatarMenu />
    </header>
  )
    ;
};

