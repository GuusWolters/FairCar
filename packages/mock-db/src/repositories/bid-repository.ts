import { IBidRepository } from "@repo/business/bid/bid-repository-interface";
import { Bid, CreateBid } from "@repo/shared/schemas/bid-schema";

export class BidRepository implements IBidRepository {
  bids: Bid[] = [
    {
      id: 1,
      amount: 10000,
      listingId: 1,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      amount: 15000,
      listingId: 1,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  getBidsByListingId(listingId: number): Promise<Bid[]> {
    const bids = this.bids
      .filter((bid) => bid.listingId === listingId)
      .sort((a, b) => b.amount - a.amount);
    return Promise.resolve(bids);
  }

  createBid(bid: CreateBid): Promise<Bid> {
    const newBid: Bid = {
      id: this.bids.length + 1,
      amount: bid.amount,
      listingId: bid.listingId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.bids.push(newBid);
    return Promise.resolve(newBid);
  }
}
