import { createClient } from "jstack";
import { AppRouter } from "@repo/backend/src";

/**
 * Your type-safe API client
 * @see https://jstack.app/docs/backend/api-client
 */
export const apiClient: ReturnType<typeof createClient<AppRouter>> =
  createClient<AppRouter>({
    baseUrl: "https://backend-production.guus-w.workers.dev/api",
  });
