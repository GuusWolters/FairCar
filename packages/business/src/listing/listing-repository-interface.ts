import { Listing } from "@repo/shared/schemas/listing-schema";

export interface IListingRepository {
  getRecommendedListings(): Promise<Listing[]>;
  getAllListings(limit: number, offset: number): Promise<Listing[]>;
  getListingById(id: number): Promise<Listing | undefined>;
}
