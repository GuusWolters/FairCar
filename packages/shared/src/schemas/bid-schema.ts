import z from "zod";

const bidSchema = z.object({
  id: z.number().int().min(0),
  listingId: z.number().int().min(0),
  amount: z.number().min(0),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

const bidInputSchema = bidSchema.pick({
  amount: true,
});

const createBidSchema = bidSchema.pick({
  amount: true,
  listingId: true,
});

const frontendBidSchema = bidSchema.pick({
  amount: true,
  createdAt: true,
});

export { bidSchema, bidInputSchema, createBidSchema, frontendBidSchema };
export type Bid = z.infer<typeof bidSchema>;
export type BidInput = z.infer<typeof bidInputSchema>;
export type CreateBid = z.infer<typeof createBidSchema>;
export type FrontendBid = z.infer<typeof frontendBidSchema>;
