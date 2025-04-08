import { routes } from "@/utils/routes";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background flex min-h-12 items-center justify-center border-t z-50">
      <div className="container flex items-center justify-between">
        <div className="flex flex-col gap-x-1 sm:flex-row">
          <p className="hidden text-sm sm:block">
            &#169; {currentYear} FairCar by Guus Wolters | All Rights Reserved
          </p>
          <p className="text-sm sm:hidden">
            &#169; {currentYear} FairCar by Guus Wolters <br />
            All Rights Reserved
          </p>
          {/* <ServerStatus /> */}
        </div>
        <nav className="space-x-2">
          <Link href={routes.auth.login} className="text-sm">
            Inloggen
          </Link>
          <Link href={routes.auth.register} className="text-sm">
            Registeren
          </Link>
        </nav>
      </div>
    </footer>
  );
};
