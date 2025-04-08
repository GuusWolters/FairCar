import { Cars } from "@/components/cars/cars";
import { PageTop } from "@/components/global/page-top";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Auto's",
  description:
    "Bekijk alle auto's die momenteel te koop zijn op FairCar. Heb je een auto te koop? Plaats hem op FairCar.",
};

const CarsPage = () => {
  return (
    <>
      <PageTop title="Auto's" />
      <main className="container m-auto relative">
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              Loading...
            </div>
          }
        >
          <Cars />
        </Suspense>
      </main>
    </>
  );
};

export default CarsPage;
