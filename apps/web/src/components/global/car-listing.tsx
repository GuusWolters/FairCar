"use client";

import { routes } from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Button } from "@repo/ui/components/button";
import { Listing } from "@repo/shared/schemas/listing-schema";

interface CarListingProps extends PropsWithChildren {
  details: Listing;
}

export const CarListing = ({ details, children }: CarListingProps) => {
  return (
    <Link
      prefetch={false}
      href={routes.cars.single(details.id.toString())}
      className="car-listing-shadow w-full rounded-3xl p-2.5"
    >
      <div className="aspect-video overflow-hidden rounded-xl">
        <Image
          src={"/Sample-car-image.png"}
          alt="Sample Car"
          className="bg-secondary aspect-video w-full rounded-xl object-contain"
          loading="lazy"
          quality={70}
          width={300}
          height={200}
        />
      </div>
      <div className="p-2">
        <h3 className="mt-3 h3">{details.title}</h3>
        {children}
        <div className="mt-2 flex items-center gap-4">
          <Button>Bekijk Auto</Button>
        </div>
      </div>
    </Link>
  );
};
