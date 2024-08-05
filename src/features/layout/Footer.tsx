import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import clsx from "clsx";
import { Goal, Home, PenSquare, User } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../../components/ui/button";
export const Footer = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    return <></>
  } else return (

    <footer className="border-t border-accent ">
      <div className="py-2 flex sticky justify-between container bottom-0 left-0 right-0 bg-background max-w-lg m-auto ">
        <Link href='/'
          className={clsx(
            buttonVariants({
              variant: 'ghost',
            }),
            "flex-1",
          )}
        >
          <Home size={16} />
        </Link>
        <Link href='/'
          className={clsx(
            buttonVariants({
              variant: 'ghost',
            }),
            "flex-1",
          )}
        >
          <Goal size={16} />
        </Link>
        <Link href='/'
          className={clsx(
            buttonVariants({
              variant: 'ghost',
            }),
            "flex-1",
          )}
        >
          <PenSquare size={16} />
        </Link>
        <Link href='/'
          className={clsx(
            buttonVariants({
              variant: 'ghost',
            }),
            "flex-1",
          )}
        >
          <User size={16} />
        </Link>


      </div>
    </footer>
  );
};