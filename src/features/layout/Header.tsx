
import { Logger } from "../../_components/Logger";
import { ThemeToggle } from "../theme/ThemeToggle";
export const Header = async () => {

  return (
    <header className="border-b border-b-accent ">
      <div className="container flex items-center py-2 max-w-lg m-auto gap-1">
        <h2 className="text-2xl font-bold mr-auto text-primary ">
          Life Changer
        </h2>
        <ThemeToggle />
        <Logger />

      </div>

    </header>
  )
    ;
};

