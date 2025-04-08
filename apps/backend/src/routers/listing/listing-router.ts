import { HTTPException } from "hono/http-exception";
import { listingSchema } from "@repo/shared/schemas/listing-schema";
import { j, listingProcedure } from "../../jstack";
import { z } from "zod";

export const listingRouter = j.router({
  recommended: listingProcedure.query(async ({ c, ctx }) => {
    try {
      const recommendedListings =
        await ctx.listingService.getRecommendedListings();
      return c.superjson(recommendedListings);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new HTTPException(400, { message: error.message });
      }
      throw new HTTPException(500, { message: "Internal server error" });
    }
  }),

  all: listingProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        page: z.number().optional(),
      })
    )
    .query(async ({ c, ctx, input }) => {
      try {
        const allListings = await ctx.listingService.getAllListings(
          input.limit ?? 12,
          input.page ?? 1
        );
        return c.superjson(allListings);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          throw new HTTPException(400, { message: error.message });
        }
        throw new HTTPException(500, { message: "Internal server error" });
      }
    }),

  byId: listingProcedure
    .input(listingSchema.pick({ id: true }))
    .query(async ({ c, ctx, input }) => {
      try {
        const listing = await ctx.listingService.getListingById(input.id);
        if (!listing) {
          throw new HTTPException(404, { message: "Listing not found" });
        }
        return c.superjson(listing);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          throw new HTTPException(400, { message: error.message });
        }
        throw new HTTPException(500, { message: "Internal server error" });
      }
    }),
});
