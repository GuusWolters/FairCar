import { MockDbRepository } from "@repo/mock-db/index";
import { ListingService } from "./listing-service";

describe("listing service", () => {
  let mockDb: MockDbRepository;
  let listingService: ListingService;

  beforeAll(() => {
    mockDb = new MockDbRepository();
    listingService = new ListingService(mockDb.listingRepository());
  });

  describe("getRecommendedListings", () => {
    it("should return recommended listings", async () => {
      const listings = await listingService.getRecommendedListings();
      expect(listings).toHaveLength(3);
      expect(listings[0]?.title).toBe("Volkswagen Golf");
      expect(listings[1]?.title).toBe("Honda Civic");
      expect(listings[2]?.title).toBe("Toyota Corolla");
    });
  });

  describe("getAllListings", () => {
    it("should return all listings", async () => {
      const { count, results } = await listingService.getAllListings();
      expect(count).toBe(7);
      expect(results).toHaveLength(7);
    });
  });

  describe("getListingById", () => {
    it("should return a listing by id", async () => {
      const listing = await listingService.getListingById(1);
      expect(listing).toBeDefined();
      expect(listing?.title).toBe("Toyota Corolla");
    });

    it("should return undefined for an expired listing", async () => {
      const listing = await listingService.getListingById(3);
      expect(listing).toBeUndefined();
    });

    it("should return undefined for a non-existent listing", async () => {
      const listing = await listingService.getListingById(999);
      expect(listing).toBeUndefined();
    });
  });
});
