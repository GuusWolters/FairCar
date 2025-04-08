import { Listing } from "@repo/shared/schemas/listing-schema";
import {
  formattedLicensePlate,
  formattedMileage,
  formattedPrice,
} from "@repo/shared/utils/formatting";

interface CarListingProps {
  details: Listing;
}

export function CarListingDetails({ details }: CarListingProps) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-1">
      <p>{formattedPrice(details.minimumBidPrice)}</p>
      <p>{formattedMileage(details.mileage)}</p>
      <p>{details.manufactureDate}</p>
      <p>{details.fuelType}</p>
      <p>{details.transmission}</p>
      {details.licensePlate && (
        <p>{formattedLicensePlate(details.licensePlate)}</p>
      )}
      <p>{details.location}</p>
    </div>
  );
}
