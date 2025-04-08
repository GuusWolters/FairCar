"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { CarListing } from "../global/car-listing";
import { CarListingDetails } from "../global/car-listing-details";
import { apiClient } from "@/lib/apiClient";

const RecommendedCars = () => {
  const { data: recommendedCars, error: recommendedCarsError } =
    useSuspenseQuery({
      queryKey: ["recommended-cars"],
      queryFn: async () => {
        const res = await apiClient.listing.recommended.$get();
        return await res.json();
      },
      staleTime: 1000 * 60 * 15,
      gcTime: 1000 * 60 * 15,
    });

  return (
    <>
      {recommendedCarsError ? (
        <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-200">
          <p className="text-center text-lg text-gray-700">
            Er is een fout opgetreden bij het ophalen van de aanbevolen
            auto&apos;s.
          </p>
        </div>
      ) : recommendedCars.length == 0 ? (
        <p className="text-lg text-muted-foreground mb-10">
          Er zijn momenteel geen aanbevolen auto&apos;s beschikbaar.
        </p>
      ) : (
        <>
          {recommendedCars.map((car) => (
            <CarListing key={car.id} details={car}>
              <CarListingDetails details={car} />
            </CarListing>
          ))}
        </>
      )}
    </>
  );
};

export default RecommendedCars;
