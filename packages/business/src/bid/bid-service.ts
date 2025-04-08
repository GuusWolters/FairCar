import { Bid, CreateBid, FrontendBid } from "@repo/shared/schemas/bid-schema";
import { IBidRepository } from "./bid-repository-interface";

export class BidService {
  constructor(private readonly bidRepository: IBidRepository) {}

  async getBidsByListingId(listingId: number): Promise<Bid[] | undefined> {
    return await this.bidRepository.getBidsByListingId(listingId);
  }

  async placeBid(
    bid: CreateBid,
    minimumBid: number,
    endDate: Date
  ): Promise<Bid> {
    // Controleer of de veiling is afgelopen
    if (endDate < new Date()) {
      throw new Error("Veiling is afgelopen");
    }

    // Bod moet hoger zijn dan het minimum bod
    if (minimumBid && minimumBid > bid.amount) {
      throw new Error("Bod moet hoger zijn dan het minimum bod");
    }

    // Bod moet hoger zijn dan het hoogste bod
    const higestBid = await this.bidRepository.getBidsByListingId(
      bid.listingId
    );

    if (higestBid && higestBid[0] && higestBid[0].amount > bid.amount) {
      throw new Error("Bod moet hoger zijn dan het hoogste bod");
    }

    const createdBid = await this.bidRepository.createBid(bid);
    if (!createdBid) {
      throw new Error("Failed to create bid");
    }
    return createdBid;
  }
}
