import { cors } from "hono/cors";
import { j } from "./jstack";
import { listingRouter } from "./routers/listing/listing-router";
import { bidRouter } from "./routers/bid/bid-router";
import { csrf } from "hono/csrf";
import { Context, Next } from "hono";
/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */
const api = j
  .router()
  .basePath("/api")
  .use(
    cors({
      allowHeaders: ["Content-Type", "x-is-superjson"],
      exposeHeaders: ["x-is-superjson"],
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  )
  .use(csrf())
  .onError(j.defaults.errorHandler);

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
export const appRouter = j.mergeRouters(api, {
  listing: listingRouter,
  bid: bidRouter,
});

export type AppRouter = typeof appRouter;

export default appRouter;
