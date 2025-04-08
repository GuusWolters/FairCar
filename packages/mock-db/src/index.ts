import { BidRepository } from "./repositories/bid-repository";
import { ListingRepository } from "./repositories/listing-repository";

export class MockDbRepository {
  listingRepository(): ListingRepository {
    return new ListingRepository();
  }
  bidRepository(): BidRepository {
    return new BidRepository();
  }
}
