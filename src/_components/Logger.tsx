
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogIn, LogOut } from "lucide-react";
export const Logger = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  return (
    isUserAuthenticated ?
      (<LogoutLink>
        <LogOut size={20} />
      </LogoutLink>) :
      (<LoginLink>
        <LogIn size={20} />
      </LoginLink>)

  );
}