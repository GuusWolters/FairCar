import { FUEL_TYPES, TRANSMISSIONS } from "@repo/shared/utils/constants";
import {
  integer,
  pgTable,
  varchar,
  timestamp,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const fuelEnum = pgEnum("fuel", FUEL_TYPES);
export const transmissionEnum = pgEnum("transmission", TRANSMISSIONS);

export const listingTable = pgTable(
  "listings",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 1024 }).notNull(),
    licensePlate: varchar("license_plate", { length: 6 }),
    brand: varchar("brand", { length: 255 }).notNull(),
    model: varchar("model", { length: 255 }).notNull(),
    manufactureDate: integer("manufacture_date").notNull(),
    mileage: integer("mileage").notNull(),
    fuelType: fuelEnum("fuel_type").notNull(),
    transmission: transmissionEnum("transmission").notNull(),
    minimumBidPrice: integer("minimum_bid_price").notNull(),
    endDate: timestamp("end_date", { mode: "date" }).notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("listing-id_idx").on(table.id)]
);
