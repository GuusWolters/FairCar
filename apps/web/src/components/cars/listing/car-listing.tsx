"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/carousel";
import { usePathname } from "next/navigation";
import { PageTop } from "@/components/global/page-top";
import { Bids } from "./bids";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { CarListingDetails } from "@/components/global/car-listing-details";
import { formattedPrice } from "@repo/shared/utils/formatting";
import Image from "next/image";

const images = ["/Sample-car-image.png", "/car-listing-fallback.jpg"];

export function CarListing() {
  const pathname = usePathname();
  const id = pathname.split("/").pop() || 0;

  const {
    data: car,
    error: carError,
    isLoading: carIsLoading,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const res = await apiClient.listing.byId.$get({
        id: parseInt(id as string),
      });
      return await res.json();
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  useEffect(() => {
    if (carError) {
      toast.error("Er is iets mis gegaan met het ophalen van de auto.");
    }
  }, [carError]);

  if (carIsLoading || !car) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <Loader2 className="animate-spin h-10 w-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTop
        title={car.title}
        rightMenu={
          <p className="text-muted">
            Minimale bod: {formattedPrice(car.minimumBidPrice)}
          </p>
        }
      />
      <main className="container m-auto py-10">
        <div className="space-y-10">
          <section className="flex flex-col justify-center lg:flex-row lg:justify-between gap-10">
            <Carousel className="max-w-full lg:max-w-1/2">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-0 flex size-full items-center justify-center">
                      <Image
                        alt="Car photo"
                        src={image}
                        width={500}
                        height={500}
                        className="object-contain size-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-between w-full mt-2">
                <CarouselPrevious className="static translate-none" />
                <CarouselNext className="static translate-none" />
              </div>
            </Carousel>

            <Bids minimumBid={car.minimumBidPrice} />
          </section>
          <section>
            <h2 className="h2">Beschrijving</h2>
            <p>{car.description}</p>
          </section>
          <section>
            <h2 className="h2">Details</h2>
            <ul>
              <CarListingDetails details={car} />
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
