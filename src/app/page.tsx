import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export default async function Home() {

  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  return (
    <div>
      <RegisterLink>Sign up</RegisterLink>

      {isUserAuthenticated ? <div>Authenticated</div> : <div>Not Authenticated</div>}
    </div>
  );
}
