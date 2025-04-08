import Link from "next/link";
import { buttonVariants } from "@repo/ui/components/button";
import { routes } from "@/utils/routes";
import { ArrowRight } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex min-h-12 items-center justify-center border-b backdrop-blur">
      <div className="container flex justify-between">
        <Link href={routes.home} className="text-2xl font-semibold">
          FairCar
        </Link>
        <nav className="space-x-2">
          {/* <Link
            href={routes.auth.login}
            className={buttonVariants({ variant: "ghost" })}
          >
            Inloggen
          </Link>
          <Link href={routes.auth.register} className={buttonVariants()}>
            Registeren
          </Link> */}
          <Link href={routes.dashboard.createAd} className={buttonVariants()}>
            Auto Aanbieden
            <ArrowRight />
          </Link>
        </nav>
      </div>
    </header>
  );
};
