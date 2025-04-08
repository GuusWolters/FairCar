"use client";

import { formatNumber, formattedPrice } from "@repo/shared/utils/formatting";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BidInput,
  bidInputSchema,
  FrontendBid,
} from "@repo/shared/schemas/bid-schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Form } from "@repo/ui/components/form";
import { toast } from "sonner";
import { useWebSocket } from "jstack/client";

const socket = apiClient.bid.placeBid.$ws();

export function Bids({ minimumBid }: { minimumBid: number }) {
  const pathname = usePathname();
  const id = pathname.split("/").pop() || 0;

  const [bids, setBids] = useState<FrontendBid[] | undefined>(undefined);
  const [disabled, setDisabled] = useState(true);

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(value) || 0;
    bidForm.setValue("amount", numericValue);
  };

  useWebSocket(socket, {
    placeBid: ({ bid }) => {
      setDisabled(true);
      setBids((prevBids) => {
        if (!prevBids) return [];
        const newBid = {
          amount: bid.amount,
          createdAt: bid.createdAt,
        };
        return [newBid, ...prevBids];
      });
      setDisabled(false);
    },
    connect: ({ listingId }) => {
      console.log("Connected to listing:", listingId);
      setDisabled(false);
    },
    onConnect: () => {
      setDisabled(false);
      toast.success("Verbonden met de biedingen server");
    },
    onError: () => {
      setDisabled(true);
      toast.error("Er is een fout opgetreden bij het verbinden met de server");
    },
  });

  useEffect(() => {
    socket.emit("connect", {
      listingId: parseInt(id as string),
    });
    if (socket.isConnected) setDisabled(false);
  }, [id]);

  // get session

  // load bids
  const { isPending: bidsPending } = useQuery({
    queryKey: ["bids", id],
    queryFn: async () => {
      const res = await apiClient.bid.getBidByListingId.$get({
        listingId: parseInt(id as string),
      });
      const data = await res.json();
      if (res.status == 200) {
        setBids(data);
      }
      return data;
    },
    retry: true,
  });

  // place bid
  const bidForm = useForm<BidInput>({
    resolver: zodResolver(bidInputSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: async (values: BidInput) => {
      if (values.amount <= 0) {
        toast.error("Bod moet hoger zijn dan 0");
        return;
      }
      if (bids && bids[0] && bids[0].amount >= values.amount) {
        toast.error("Bod moet hoger zijn dan het hoogste bod");
        return;
      }
      if (minimumBid && minimumBid > values.amount) {
        toast.error("Bod moet hoger zijn dan het minimum bod");
        return;
      }
      socket.emit("placeBid", {
        amount: values.amount,
      });
      toast.success("Bod geplaatst");
      bidForm.reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Er is een fout opgetreden bij het plaatsen van het bod");
    },
  });

  return (
    <div className="w-full lg:w-1/2">
      <h2 className="h2">Bieden</h2>

      <Form {...bidForm}>
        <form
          onSubmit={bidForm.handleSubmit((values) => onSubmit(values))}
          className="flex items-end gap-2"
        >
          <FormField
            control={bidForm.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bod</FormLabel>
                <FormControl>
                  <Input
                    value={`€ ${formatNumber(field.value)}`}
                    onChange={(e) => handleBidChange(e)}
                    disabled={disabled || bidsPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={disabled || bidsPending}>
            Bieden
          </Button>
        </form>
      </Form>

      <h3 className="h3 mt-4">Biedingen</h3>

      {!bids || bids.length === 0 ? (
        <p cy-data="no-bids" className="mt-2">
          Er is nog niet geboden
        </p>
      ) : bidsPending ? (
        <div className="w-full h-3/5 flex justify-center items-center">
          <Loader2 className="animate-spin h-10 w-10" />
        </div>
      ) : (
        <ul
          className="mt-2 grid grid-cols-2 grid-rows-10 gap-2 grid-flow-col"
          cy-data="bids"
        >
          {bids.slice(0, 20).map((bid, index) => (
            <li
              className={cn(
                "flex justify-between rounded-sm px-2 py-1 items-center",
                index % 2 == 0 && "bg-primary/30",
                index == 0 && "bg-primary text-background "
              )}
              key={index}
            >
              <p>
                {new Intl.DateTimeFormat("nl-NL", {
                  dateStyle: "short",
                  timeStyle: "medium",
                  hour12: false, // Use 24-hour clock
                }).format(new Date(bid.createdAt ?? 0))}
              </p>
              <p>{formattedPrice(bid.amount)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
