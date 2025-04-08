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

export function ManufactureDateFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const minManufactureDateParam = searchParams.get("minManufactureDate");
  const maxManufactureDateParam = searchParams.get("maxManufactureDate");

  const currentYear = new Date().getFullYear();
  const manufactureDates = Array.from(
    { length: 50 },
    (_, i) => currentYear - i
  );

  const [minManufactureDate, setMinManufactureDate] = useState(
    manufactureDates.includes(parseInt(minManufactureDateParam || ""))
      ? minManufactureDateParam
      : ""
  );
  const [maxManufactureDate, setMaxManufactureDate] = useState(
    manufactureDates.includes(parseInt(maxManufactureDateParam || ""))
      ? maxManufactureDateParam
      : ""
  );

  useEffect(() => {
    if (
      minManufactureDateParam &&
      manufactureDates.includes(parseInt(minManufactureDateParam))
    ) {
      setMinManufactureDate(minManufactureDateParam);
    }
    if (
      maxManufactureDateParam &&
      manufactureDates.includes(parseInt(maxManufactureDateParam))
    ) {
      setMaxManufactureDate(maxManufactureDateParam);
    }
  }, [minManufactureDateParam, maxManufactureDateParam, manufactureDates]);

  const handleMinimumManufactureDateChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const numericValue = parseInt(value);

    if (
      !manufactureDates.includes(numericValue) ||
      numericValue > currentYear
    ) {
      value = currentYear.toString();
    }

    if (numericValue > parseInt(maxManufactureDate || currentYear.toString())) {
      setMaxManufactureDate(value);
      params.set("maxManufactureDate", value);
    }
    setMinManufactureDate(value);
    params.set("minManufactureDate", value);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleMaximumManufactureDateChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const numericValue = parseInt(value);

    if (
      !manufactureDates.includes(numericValue) ||
      numericValue > currentYear
    ) {
      value = currentYear.toString();
    }

    if (numericValue < parseInt(minManufactureDate || "0")) {
      setMinManufactureDate(value);
      params.set("minManufactureDate", value);
    }
    setMaxManufactureDate(value);
    params.set("maxManufactureDate", value);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-1">
      <Label>Bouwjaar</Label>
      <div className="flex">
        <Select
          onValueChange={handleMinimumManufactureDateChange}
          value={minManufactureDate || ""}
        >
          <SelectTrigger
            className="min-w-1/2 rounded-none rounded-l-md"
            cy-data="min-manufacture-date-filter"
          >
            <SelectValue placeholder="Min">{minManufactureDate}</SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {manufactureDates.map((date) => (
              <SelectItem key={date} value={date.toString()}>
                {date}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={handleMaximumManufactureDateChange}
          value={maxManufactureDate || ""}
        >
          <SelectTrigger
            className="min-w-1/2 rounded-none rounded-r-md border-l-0"
            cy-data="max-manufacture-date-filter"
          >
            <SelectValue placeholder="Max">{maxManufactureDate}</SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {manufactureDates.map((date) => (
              <SelectItem key={date} value={date.toString()}>
                {date}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
