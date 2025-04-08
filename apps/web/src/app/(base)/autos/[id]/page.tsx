import { CarListing } from "@/components/cars/listing/car-listing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto",
  description:
    "Bekijk deze auto die momenteel te koop is op FairCar. Heb je een auto te koop? Plaats hem op FairCar.",
};

const CarListingPage = () => {
  return <CarListing />;
};

export default CarListingPage;
