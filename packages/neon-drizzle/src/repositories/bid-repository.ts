import { IBidRepository } from "@repo/business/bid/bid-repository-interface";
import { Bid, CreateBid } from "@repo/shared/schemas/bid-schema";
import { type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { bidTable } from "../schemas/bid-schema";
import { desc, eq } from "drizzle-orm";

export class BidRepository implements IBidRepository {
  constructor(private db: NeonHttpDatabase) {}

  async getBidsByListingId(listingId: number): Promise<Bid[]> {
    const bids = await this.db
      .select()
      .from(bidTable)
      .where(eq(bidTable.listingId, listingId))
      .orderBy(desc(bidTable.amount))
      .limit(3);

    if (bids) return bids;
    throw new Error("Failed to fetch listing");
  }

  async createBid(bid: CreateBid): Promise<Bid> {
    const createdBid = await this.db.insert(bidTable).values(bid).returning();
    if (!createdBid || !createdBid[0]) {
      throw new Error("Failed to create bid");
    }
    return createdBid[0];
  }
}
