import { InferMiddlewareOutput, jstack } from "jstack";
import { NeonDrizzleRepository } from "@repo/neon-drizzle/index";
import { ListingService } from "@repo/business/listing/listing-service";
import { BidService } from "@repo/business/bid/bid-service";
import { RateLimitBinding } from "@elithrar/workers-hono-rate-limit";

export interface Env {
  Bindings: {
    DATABASE_URL: string;
    RATE_LIMITER: RateLimitBinding;
  };
}

export const j = jstack.init<Env>();

const databaseMiddleware = j.middleware(async ({ c, next }) => {
  const db = new NeonDrizzleRepository(c.env.DATABASE_URL);

  return await next({ db });
});
type DatabaseMiddlewareOutput = InferMiddlewareOutput<
  typeof databaseMiddleware
>;

const listingMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const { db } = ctx as DatabaseMiddlewareOutput;
  const listingService = new ListingService(db.listingRepository());

  return await next({ listingService });
});

const bidMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const { db } = ctx as DatabaseMiddlewareOutput;
  const bidService = new BidService(db.bidRepository());

  return await next({ bidService });
});

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure;
export const databaseProcedure = publicProcedure.use(databaseMiddleware);

export const listingProcedure = databaseProcedure.use(listingMiddleware);
export const bidProcedure = databaseProcedure
  .use(bidMiddleware)
  .use(listingMiddleware);
