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
import { FUEL_TYPES } from "@repo/shared/utils/constants";

function normalizeString(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function FuelTypeFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fuelTypeParam = searchParams.get("fuelType");

  const [fuelType, setFuelType] = useState(
    FUEL_TYPES.find(
      (type) => normalizeString(type) === normalizeString(fuelTypeParam || "")
    ) || ""
  );

  useEffect(() => {
    if (
      fuelTypeParam &&
      FUEL_TYPES.some(
        (type) => normalizeString(type) === normalizeString(fuelTypeParam)
      )
    ) {
      const foundFuelType = FUEL_TYPES.find(
        (type) => normalizeString(type) === normalizeString(fuelTypeParam)
      );
      if (foundFuelType) {
        setFuelType(foundFuelType);
      }
    }
  }, [fuelTypeParam]);

  const handleFuelTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const normalizedValue = normalizeString(value);

    if (FUEL_TYPES.some((type) => normalizeString(type) === normalizedValue)) {
      setFuelType(value);
      params.set("fuelType", normalizedValue);
    } else {
      setFuelType("");
      params.delete("fuelType");
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-1">
      <Label>Brandstof</Label>
      <Select onValueChange={handleFuelTypeChange} value={fuelType || ""}>
        <SelectTrigger className="w-full" cy-data="fuel-select-filter">
          <SelectValue placeholder="Selecteer">
            {fuelType || "Selecteer"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {FUEL_TYPES.map((fuelType) => (
            <SelectItem key={fuelType} value={fuelType}>
              {fuelType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
