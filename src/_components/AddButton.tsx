import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
export const AddButton = () => {

  return (

    <Button className="sm:col-span-2 border p-1 w-full h-full bg-card text-primary active:bg-primary active:text-primary-foreground hover:bg-primary hover:text-primary-foreground"><Plus /></Button>

  );
};