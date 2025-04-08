import { Listing } from "@repo/shared/schemas/listing-schema";
import { IListingRepository } from "./listing-repository-interface";

export class ListingService {
  constructor(private readonly postRepository: IListingRepository) {}

  async getRecommendedListings(): Promise<Listing[]> {
    return await this.postRepository.getRecommendedListings();
  }

  async getAllListings(
    limit: number,
    page: number
  ): Promise<{
    count: number;
    results: Listing[];
  }> {
    const offset = (page - 1) * limit;
    const res = await this.postRepository.getAllListings(limit, offset);
    if (!res) return { count: 0, results: [] };
    const count = res.length;
    return {
      count,
      results: res,
    };
  }

  async getListingById(id: number): Promise<Listing | undefined> {
    const listing = await this.postRepository.getListingById(id);

    if (listing && listing.endDate < new Date()) return undefined;
    return await this.postRepository.getListingById(id);
  }
}
