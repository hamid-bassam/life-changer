import { Plus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import { cn } from "../lib/utils";

type AddButtonProps = {
  link: string;
}
export const AddButton = (props: AddButtonProps) => {

  return (

    <Link href={props.link} className={cn(buttonVariants({ variant: "outline" }), "sm:col-span-2 border p-1 w-full h-full bg-card text-primary active:bg-primary active:text-primary-foreground hover:bg-primary hover:text-primary-foreground")} > <Plus /></Link >

  );
};