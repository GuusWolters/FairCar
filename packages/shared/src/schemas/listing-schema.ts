import z from "zod";
import { FUEL_TYPES, TRANSMISSIONS } from "../utils/constants";

const listingSchema = z.object({
  id: z.number().int().min(0),
  // userId: z.string(), // TODO: edit
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(1024),
  licensePlate: z.string().length(6).nullable(),
  brand: z.string().min(1).max(255),
  model: z.string().min(1).max(255),
  manufactureDate: z.number().int().min(1900).max(new Date().getFullYear()),
  mileage: z.number().int().min(0),
  fuelType: z.enum(FUEL_TYPES),
  transmission: z.enum(TRANSMISSIONS),
  minimumBidPrice: z.number().int().min(0),
  endDate: z.date(),
  location: z.string().min(1).max(255),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export { listingSchema };

export type Listing = z.infer<typeof listingSchema>;
