"use client";

import Link from "next/link";
import { buttonVariants } from "@repo/ui/components/button";
import { routes } from "@/utils/routes";
import { useSearchParams } from "next/navigation";

import { BrandFilter } from "../global/filters/brand-filter";
import { ModelFilter } from "../global/filters/model-filter";
import { ManufactureDateFilter } from "../global/filters/manufacture-date-filter";
import { PriceFilter } from "../global/filters/price-filter";
import { MileageFilter } from "../global/filters/mileage-filter";
import { FuelTypeFilter } from "../global/filters/fuel-type-filter";
import { TransmissionFilter } from "../global/filters/transmission-filter";
import { LocationFilter } from "../global/filters/location-filter";

const CarFilters = () => {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const searchUrl = `${routes.cars.all}?${searchParamsString}`;

  return (
    <div className="m-auto mb-16 w-full -mt-40 rounded-2xl bg-background drop-shadow-md xl:w-[75%] p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Brand */}
        <BrandFilter />

        {/* Model */}
        <ModelFilter />

        {/* Manufacture date */}
        <ManufactureDateFilter />

        {/* Price */}
        <PriceFilter />

        {/* Mileage */}
        <MileageFilter />

        {/* Fuel type */}
        <FuelTypeFilter />

        {/* Transmission */}
        <TransmissionFilter />

        {/* Location */}
        <LocationFilter />

        {/* Search */}
        <div className="flex items-end">
          <Link
            className={buttonVariants({ className: "w-full" })}
            href={searchUrl}
            cy-data="search-filter-button"
          >
            Zoeken
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarFilters;
