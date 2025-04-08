import { HTTPException } from "hono/http-exception";
import { bidProcedure, j } from "../../jstack";
import { bidSchema, FrontendBid } from "@repo/shared/schemas/bid-schema";
import { z } from "zod";

export const bidRouter = j.router({
  getBidByListingId: bidProcedure
    .input(bidSchema.pick({ listingId: true }))
    .query(async ({ c, ctx, input }) => {
      try {
        const bids = await ctx.bidService.getBidsByListingId(input.listingId);
        return c.superjson(bids);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          throw new HTTPException(400, { message: error.message });
        }
        throw new HTTPException(500, { message: "Internal server error" });
      }
    }),

  placeBid: bidProcedure
    .incoming(
      z.object({
        placeBid: bidSchema.pick({ amount: true }),
        connect: bidSchema.pick({ listingId: true }),
      })
    )
    .outgoing(
      z.object({
        placeBid: z.object({
          bid: bidSchema.pick({ amount: true, createdAt: true }),
          status: z.enum(["success", "failed"]),
          message: z.string(),
        }),
        connect: bidSchema.pick({ listingId: true }),
      })
    )
    .ws(({ c, io, ctx }) => ({
      async onConnect({ socket }) {
        let listingId: string = "undefined";
        socket.on("placeBid", async (bid) => {
          // Optional: Implement message persistence
          if (!bid) {
            console.error("Bid is undefined");
            return;
          }

          if (!listingId) {
            console.error("Listing ID is undefined");
            return;
          }

          try {
            const listing = await ctx.listingService.getListingById(
              parseInt(listingId)
            );
            if (!listing) {
              console.error("Listing not found");
              return;
            }

            const res = await ctx.bidService.placeBid(
              {
                amount: bid.amount,
                listingId: parseInt(listingId),
              },
              listing.minimumBidPrice,
              listing.endDate
            );

            console.log("Bid placed:", res);

            const createBid: FrontendBid = {
              amount: res.amount,
              createdAt: res.createdAt,
            };

            // Broadcast the message to all clients in the room
            await io.to(listingId).emit("placeBid", {
              bid: createBid,
              status: "success",
              message: "Bid placed successfully",
            });
          } catch (error) {
            console.error("Error placing bid:", error);
            await io.emit("placeBid", {
              bid: {
                amount: 0,
                createdAt: new Date(),
              },
              status: "failed",
              message:
                error instanceof Error
                  ? error.message
                  : "An unknown error occurred",
            });
          }
        });
        socket.on("connect", async (connect) => {
          if (!connect) {
            console.error("Connect is undefined");
            return;
          }
          // Join the room
          listingId = connect.listingId.toString();
          socket.join(listingId);
          // console.log("Client connected to room:", listingId);
        });
      },
      onDisconnect({ socket }) {
        // console.log("Client disconnected:", socket);
      },
      onError({ socket, error }) {
        console.error("WebSocket error:", error);
      },
    })),
});
