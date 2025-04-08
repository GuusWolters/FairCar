import { IListingRepository } from "@repo/business/listing/listing-repository-interface";
import { Listing } from "@repo/shared/schemas/listing-schema";
import { type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { listingTable } from "../schemas/listing-schema";
import { and, asc, eq, gte } from "drizzle-orm";

export class ListingRepository implements IListingRepository {
  constructor(private db: NeonHttpDatabase) {}

  async getRecommendedListings(): Promise<Listing[]> {
    const recommendedListings = await this.db
      .select()
      .from(listingTable)
      .orderBy(asc(listingTable.endDate))
      .where(gte(listingTable.endDate, new Date()))
      .limit(24);

    if (recommendedListings) return recommendedListings;
    throw new Error("Failed to fetch recommended listings");
  }

  async getAllListings(limit: number, offset: number): Promise<Listing[]> {
    // Fetch the paginated listings
    const allListings = await this.db
      .select()
      .from(listingTable)
      .where(gte(listingTable.endDate, new Date()))
      .orderBy(asc(listingTable.endDate))
      .limit(limit)
      .offset(offset);

    if (allListings) return allListings;
    throw new Error("Failed to fetch all listings");
  }

  async getListingById(id: number): Promise<Listing | undefined> {
    const listing = await this.db
      .select()
      .from(listingTable)
      .where(
        and(eq(listingTable.id, id), gte(listingTable.endDate, new Date()))
      )
      .limit(1);

    if (listing) return listing[0];
    throw new Error("Failed to fetch listing");
  }
}
