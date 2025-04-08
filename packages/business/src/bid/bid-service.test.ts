import { BidService } from "./bid-service";
import { CreateBid } from "@repo/shared/schemas/bid-schema";
import { MockDbRepository } from "@repo/mock-db/index";

describe("BidService", () => {
  let mockDb: MockDbRepository;
  let bidService: BidService;
  let minimumBid = 100;
  let endDate = new Date(Date.now() + 1000 * 60 * 60 * 24);

  beforeAll(() => {
    mockDb = new MockDbRepository();
    bidService = new BidService(mockDb.bidRepository());
  });

  describe("getBidsByListingId", () => {
    it("should return bids for a given listing id", async () => {
      const listingId = 1;
      const bids = await bidService.getBidsByListingId(listingId);
      expect(bids).toBeDefined();
      expect(bids?.length).toBeGreaterThan(0);
      expect(bids![0]?.listingId).toBe(listingId);
    });

    it("should return empty array for a non-existing listing id", async () => {
      const listingId = 999;
      const bids = await bidService.getBidsByListingId(listingId);
      expect(bids).toBeDefined();
      expect(bids?.length).toBe(0);
      expect(bids).toEqual([]);
    });

    it("should return an empty array for a listing id with no bids", async () => {
      const listingId = 2;
      const bids = await bidService.getBidsByListingId(listingId);
      expect(bids).toBeDefined();
      expect(bids?.length).toBe(0);
      expect(bids).toEqual([]);
    });
  });

  describe("placeBid", () => {
    it("should place a bid successfully", async () => {
      const bid: CreateBid = {
        listingId: 1,
        amount: 20000,
      };
      const createdBid = await bidService.placeBid(bid, minimumBid, endDate);
      expect(createdBid).toBeDefined();
      expect(createdBid.amount).toBe(bid.amount);
      expect(createdBid.listingId).toBe(bid.listingId);
    });

    it("should throw an error if the bid is lower than the highest bid", async () => {
      const bid: CreateBid = {
        listingId: 1,
        amount: 14000,
      };
      await expect(
        bidService.placeBid(bid, minimumBid, endDate)
      ).rejects.toThrow("Bod moet hoger zijn dan het hoogste bod");
    });

    it("should throw an error if the bid is lower than the minimum bid", async () => {
      const bid: CreateBid = {
        listingId: 1,
        amount: 10,
      };
      await expect(
        bidService.placeBid(bid, minimumBid, endDate)
      ).rejects.toThrow("Bod moet hoger zijn dan het minimum bod");
    });

    it("should throw an error if the auction has ended", async () => {
      const bid: CreateBid = {
        listingId: 1,
        amount: 20000,
      };
      const pastEndDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
      await expect(
        bidService.placeBid(bid, minimumBid, pastEndDate)
      ).rejects.toThrow("Veiling is afgelopen");
    });
  });
});
