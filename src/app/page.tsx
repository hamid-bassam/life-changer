import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export default async function Home() {

  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  return (
    <div><LoginLink>Sign in</LoginLink>

      <RegisterLink>Sign up</RegisterLink>
      <LogoutLink>Log out</LogoutLink>
      {isUserAuthenticated ? <div>Authenticated</div> : <div>Not Authenticated</div>}
    </div>
  );
}
