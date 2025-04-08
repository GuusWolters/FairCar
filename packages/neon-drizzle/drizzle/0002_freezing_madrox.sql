CREATE TYPE "public"."fuel" AS ENUM('Benzine', 'Diesel', 'Elektrisch', 'Hybride', 'Waterstof');--> statement-breakpoint
CREATE TYPE "public"."transmission" AS ENUM('Handgeschakeld', 'Automaat', 'Semi-automaat');--> statement-breakpoint
CREATE TABLE "bids" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bids_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"listing_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "listings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"description" varchar(1024) NOT NULL,
	"license_plate" varchar(6),
	"brand" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"manufacture_date" integer NOT NULL,
	"mileage" integer NOT NULL,
	"fuel_type" "fuel" NOT NULL,
	"transmission" "transmission" NOT NULL,
	"minimum_bid_price" integer NOT NULL,
	"end_date" timestamp NOT NULL,
	"location" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "posts" CASCADE;--> statement-breakpoint
ALTER TABLE "bids" ADD CONSTRAINT "bids_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "bid-id_idx" ON "bids" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "listing-id_idx" ON "listings" USING btree ("id");