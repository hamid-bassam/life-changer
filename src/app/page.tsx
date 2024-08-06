
import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export default async function Home() {

  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  return (
    <div>
      <RegisterLink>Sign up</RegisterLink>


      {isUserAuthenticated ? <div className="flex flex-col"><LogoutLink>signout</LogoutLink><p>Authenticated</p></div> : <div className="flex flex-col"><LoginLink>Log in</LoginLink><p>Not auth</p></div>}
    </div>

  );
}
