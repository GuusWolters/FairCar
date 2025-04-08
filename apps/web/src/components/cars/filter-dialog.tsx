import { Filter } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { BrandFilter } from "../global/filters/brand-filter";
import { ModelFilter } from "../global/filters/model-filter";
import { ManufactureDateFilter } from "../global/filters/manufacture-date-filter";
import { PriceFilter } from "../global/filters/price-filter";
import { MileageFilter } from "../global/filters/mileage-filter";
import { FuelTypeFilter } from "../global/filters/fuel-type-filter";
import { TransmissionFilter } from "../global/filters/transmission-filter";
import { LocationFilter } from "../global/filters/location-filter";
import { buttonVariants } from "@repo/ui/components/button";

export function FilterDialog() {
  return (
    <Dialog>
      <div className="sticky bottom-5 w-full flex justify-end px-5 pointer-events-none">
        <DialogTrigger>
          <div className="bg-primary size-20 rounded-full car-listing-shadow flex items-center justify-center pointer-events-auto">
            <Filter className="text-background size-8" />
          </div>
        </DialogTrigger>
      </div>
      <DialogContent className="lg:min-w-[900px]">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
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
            <DialogClose className={buttonVariants({ className: "w-full" })}>
              Filteren
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
