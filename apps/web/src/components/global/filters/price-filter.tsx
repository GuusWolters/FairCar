"use client";

import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formattedPrice } from "@repo/shared/utils/formatting";

export function PriceFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  const prices = [
    ...Array.from({ length: 1 }, (_, i) => 500 * (i + 1)), // 500
    ...Array.from({ length: 4 }, (_, i) => 1000 * (i + 1)), // 1000, 2000, 3000, 4000
    ...Array.from({ length: 1 }, () => 5000), // 5000
    ...Array.from({ length: 1 }, () => 7500), // 7500
    ...Array.from({ length: 1 }, () => 10000), // 10000
    ...Array.from({ length: 1 }, () => 15000), // 15000
    ...Array.from({ length: 1 }, () => 20000), // 20000
    ...Array.from({ length: 6 }, (_, i) => 25000 + 5000 * i), // 25000, 30000, 35000, 40000, 45000, 50000
    ...Array.from({ length: 5 }, (_, i) => 60000 + 10000 * i), // 60000, 70000, 80000, 90000, 100000
    ...Array.from({ length: 5 }, (_, i) => 125000 + 25000 * i), // 125000, 150000, 175000, 200000, 225000
    250000, // 250000
  ];

  const [minPrice, setMinPrice] = useState(
    prices.includes(parseInt(minPriceParam || "")) ? minPriceParam : ""
  );
  const [maxPrice, setMaxPrice] = useState(
    prices.includes(parseInt(maxPriceParam || "")) ? maxPriceParam : ""
  );

  useEffect(() => {
    if (minPriceParam && prices.includes(parseInt(minPriceParam))) {
      setMinPrice(minPriceParam);
    }
    if (maxPriceParam && prices.includes(parseInt(maxPriceParam))) {
      setMaxPrice(maxPriceParam);
    }
  }, [minPriceParam, maxPriceParam, prices]);

  const handleMinimumPriceChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const numericValue = parseInt(value);

    if (!prices.includes(numericValue)) {
      value = prices[0]!.toString();
    }

    if (
      numericValue > parseInt(maxPrice || prices[prices.length - 1]!.toString())
    ) {
      setMaxPrice(value);
      params.set("maxPrice", value);
    }
    setMinPrice(value);
    params.set("minPrice", value);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleMaximumPriceChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const numericValue = parseInt(value);

    if (!prices.includes(numericValue)) {
      value = prices[prices.length - 1]!.toString();
    }

    if (numericValue < parseInt(minPrice || prices[0]!.toString())) {
      setMinPrice(value);
      params.set("minPrice", value);
    }
    setMaxPrice(value);
    params.set("maxPrice", value);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-1">
      <Label>Prijs</Label>
      <div className="flex">
        <Select onValueChange={handleMinimumPriceChange} value={minPrice || ""}>
          <SelectTrigger
            className="min-w-1/2 rounded-none rounded-l-md"
            cy-data="min-price-filter"
          >
            <SelectValue placeholder="Min">
              {minPrice ? formattedPrice(parseInt(minPrice)) : "Min"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {prices.map((price) => (
              <SelectItem key={price} value={price.toString()}>
                {formattedPrice(price)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleMaximumPriceChange} value={maxPrice || ""}>
          <SelectTrigger
            className="min-w-1/2 rounded-none rounded-r-md border-l-0"
            cy-data="max-price-filter"
          >
            <SelectValue placeholder="Max">
              {maxPrice ? formattedPrice(parseInt(maxPrice)) : "Max"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {prices.map((price) => (
              <SelectItem key={price} value={price.toString()}>
                {formattedPrice(price)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
