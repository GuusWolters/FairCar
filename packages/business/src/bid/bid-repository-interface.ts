import { Bid, CreateBid } from "@repo/shared/schemas/bid-schema";

export interface IBidRepository {
  getBidsByListingId(listingId: number): Promise<Bid[]>;
  createBid(bid: CreateBid): Promise<Bid>;
}
