import { DashboardTooltip } from "./DashboardTooltip";
import { GoalsTooltip } from "./GoalsTooltip";
import { LifeChangerLink } from "./LifeChangerLink";
import { NotesTooltip } from "./NotesTooltip";
import { OverViewTooltip } from "./OverViewTooltip";

export const TopNavMenu = () => {

  return (
    <nav className="flex flex-col items-center md:pt-0 gap-4 px-2 sm:py-5">

      <LifeChangerLink className="justify-center" />


      <DashboardTooltip />
      <NotesTooltip />
      <GoalsTooltip />
      <OverViewTooltip />

    </nav>
  );
};