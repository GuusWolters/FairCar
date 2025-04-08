import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { ListingRepository } from "./repositories/listing-repository";
import { BidRepository } from "./repositories/bid-repository";

export class NeonDrizzleRepository {
  sql!: NeonQueryFunction<false, false>;
  db!: NeonHttpDatabase;

  constructor(databaseUrl: string) {
    // Initialize the database connection
    this.sql = neon(databaseUrl);
    this.db = drizzle({ client: this.sql });
  }

  listingRepository(): ListingRepository {
    return new ListingRepository(this.db);
  }

  bidRepository(): BidRepository {
    return new BidRepository(this.db);
  }
}
