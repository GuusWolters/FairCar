"use client";

import { CarListing } from "../global/car-listing";
import { CarListingDetails } from "../global/car-listing-details";
import { useSuspenseQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { CarsListPagination } from "./cars-list-pagination";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function CarsList({ limit }: { limit: number }) {
  const searchParams = useSearchParams();

  const [page, setPage] = useState(() => {
    const pageParam = searchParams.get("page")
      ? parseInt(searchParams.get("page") as string)
      : 1;
    return pageParam > 0 ? pageParam : 1; // Ensure page is at least 1
  });

  const { data: cars, error: carsError } = useSuspenseQuery({
    queryKey: ["cars", limit, page],
    queryFn: async () => {
      const res = await apiClient.listing.all.$get({
        limit,
        page,
      });
      return await res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4">
        {carsError ? (
          <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-200">
            <p className="text-center text-lg text-gray-700">
              Er is een fout opgetreden bij het ophalen van de auto&apos;s.
            </p>
          </div>
        ) : cars.count == 0 ? (
          <p className="text-lg text-muted-foreground mb-10">
            Er zijn momenteel geen auto&apos;s beschikbaar.
          </p>
        ) : (
          <>
            {cars.results.map((car) => (
              <CarListing key={car.id} details={car}>
                <CarListingDetails details={car} />
              </CarListing>
            ))}
          </>
        )}
      </div>
      <CarsListPagination
        page={page}
        setPage={setPage}
        limit={limit}
        results={cars.count}
      />
    </div>
  );
}
