"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BreadCrumbNavigation = () => {
  const pathname = usePathname();

  // split pathname by '/'
  const paths = pathname.split('/').filter(Boolean);

  return (

    <Breadcrumb className="hidden md:flex">

      <BreadcrumbList>
        {/** iterate over paths except last one */}
        {paths.slice(0, paths.length - 1).map((path, index) => (
          <div key={index} className="flex items-center gap-2">
            <BreadcrumbItem key={index}>
              <BreadcrumbLink asChild>
                <Link href={`/${paths.slice(0, index + 1).join('/')}`}>
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator key={index} />
          </div>
        ))}

        {/** last path */}

        <BreadcrumbItem>
          <BreadcrumbPage>
            {paths[paths.length - 1].charAt(0).toUpperCase() + paths[paths.length - 1].slice(1)}
          </BreadcrumbPage>
        </BreadcrumbItem>

      </BreadcrumbList>
    </Breadcrumb>

  );
};