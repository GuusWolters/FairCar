"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import { HTTPException } from "hono/http-exception";
import { PropsWithChildren, useState } from "react";
import { toast } from "sonner";

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            // if (err instanceof HTTPException) {
            toast.error("Something went wrong", {
              description: err.message,
            });
            // }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
