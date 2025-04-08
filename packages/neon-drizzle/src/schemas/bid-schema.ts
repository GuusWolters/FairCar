import { integer, pgTable, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { listingTable } from "./listing-schema";

export const bidTable = pgTable(
  "bids",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    // User
    listingId: integer("listing_id")
      .notNull()
      .references(() => listingTable.id),
    amount: integer("amount").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("bid-id_idx").on(table.id)]
);
