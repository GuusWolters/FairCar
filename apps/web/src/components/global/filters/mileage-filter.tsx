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
import { formattedMileage } from "@repo/shared/utils/formatting";

export function MileageFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const minMileageParam = searchParams.get("minMileage");
  const maxMileageParam = searchParams.get("maxMileage");

  const mileages = [
    ...Array.from({ length: 10 }, (_, i) => 5000 * (i + 1)), // 5000, 10000, 15000, ..., 50000
    ...Array.from({ length: 9 }, (_, i) => 60000 + 10000 * i), // 60000, 70000, ..., 140000
    ...Array.from({ length: 9 }, (_, i) => 150000 + 50000 * i), // 150000, 200000, ..., 550000
    ...Array.from({ length: 9 }, (_, i) => 600000 + 50000 * i), // 600000, 650000, ..., 1000000
  ];

  const [minMileage, setMinMileage] = useState(
    mileages.includes(parseInt(minMileageParam || "")) ? minMileageParam : ""
  );
  const [maxMileage, setMaxMileage] = useState(
    mileages.includes(parseInt(maxMileageParam || "")) ? maxMileageParam : ""
  );

  useEffect(() => {
    if (minMileageParam && mileages.includes(parseInt(minMileageParam))) {
      setMinMileage(minMileageParam);
    }
    if (maxMileageParam && mileages.includes(parseInt(maxMileageParam))) {
      setMaxMileage(maxMileageParam);
    }
  }, [minMileageParam, maxMileageParam, mileages]);

  const handleMinimumMileageChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const numericValue = parseInt(value);

    if (!mileages.includes(numericValue)) {
      value = mileages[0]!.toString();
    }

    if (
      numericValue >
      parseInt(maxMileage || mileages[mileages.length - 1]!.toString())
    ) {
      setMaxMileage(value);
      params.set("maxMileage", value);
    }
    setMinMileage(value);
    params.set("minMileage", value);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleMaximumMileageChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const numericValue = parseInt(value);

    if (!mileages.includes(numericValue)) {
      value = mileages[mileages.length - 1]!.toString();
    }

    if (numericValue < parseInt(minMileage || mileages[0]!.toString())) {
      setMinMileage(value);
      params.set("minMileage", value);
    }
    setMaxMileage(value);
    params.set("maxMileage", value);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-1">
      <Label>Kilometerstand</Label>
      <div className="flex">
        <Select
          onValueChange={handleMinimumMileageChange}
          value={minMileage || ""}
        >
          <SelectTrigger
            className="min-w-1/2 rounded-none rounded-l-md"
            cy-data="min-mileage-filter"
          >
            <SelectValue placeholder="Min">
              {minMileage ? formattedMileage(parseInt(minMileage)) : "Min"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {mileages.map((mileage) => (
              <SelectItem key={mileage} value={mileage.toString()}>
                {formattedMileage(mileage)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={handleMaximumMileageChange}
          value={maxMileage || ""}
        >
          <SelectTrigger
            className="min-w-1/2 rounded-none rounded-r-md border-l-0"
            cy-data="max-mileage-filter"
          >
            <SelectValue placeholder="Max">
              {maxMileage ? formattedMileage(parseInt(maxMileage)) : "Max"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {mileages.map((mileage) => (
              <SelectItem key={mileage} value={mileage.toString()}>
                {formattedMileage(mileage)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
