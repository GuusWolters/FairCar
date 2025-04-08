import { describe, it, expect, beforeAll } from "vitest";
import { AppRouter } from "../index";
import { createClient } from "jstack";

describe("Example", () => {
  let client: ReturnType<typeof createClient<AppRouter>>;

  beforeAll(async () => {
    client = createClient<AppRouter>({
      baseUrl: "http://localhost:8787/api",
    });
  });

  it("GET /lisint/recommended", async () => {
    const res = await client.listing.recommended.$get();
    const data = await res.json();
    expect(data).toBeDefined();
    expect(res.status).toBe(200);
  });
});
