import CarFilters from "@/components/landing/filters";
import RecommendedCars from "@/components/landing/recommended-cars";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Vind jouw droom auto",
  description:
    "Vind jouw droom auto op FairCar en weet gelijk alles van je auto.",
};

export default function Page() {
  return (
    <main>
      <h1 className="sr-only">FairCar</h1>
      <div className="bg-primary min -mt-14 h-[30vh] min-h-80 w-full" />
      <div className="container m-auto">
        <Suspense>
          <CarFilters />
        </Suspense>
        <h2 className="h1">Aanbevolen Auto&#39;s</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Suspense
            fallback={
              <div className="h-96 w-full animate-pulse rounded-lg bg-gray-200" />
            }
          >
            <RecommendedCars />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
