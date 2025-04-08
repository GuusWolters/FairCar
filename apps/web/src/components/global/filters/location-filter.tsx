"use client";

import { Button } from "@repo/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import { Label } from "@repo/ui/components/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { cn } from "@repo/ui/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { normalizeString } from "@/utils/formatters";
import { CITIES } from "@repo/shared/utils/constants";

export function LocationFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locationParam = searchParams.get("location");

  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (locationParam) {
      const normalizedLocationParam = normalizeString(locationParam);
      const foundCity = CITIES.find(
        (city) => normalizeString(city) === normalizedLocationParam
      );
      if (foundCity) {
        setLocation(foundCity);
      }
    }
  }, [locationParam]);

  const handleLocationChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const normalizedValue = normalizeString(value);

    if (CITIES.some((city) => normalizeString(city) === normalizedValue)) {
      setLocation(value);
      params.set("location", normalizedValue);
    } else {
      setLocation("");
      params.delete("location");
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-1">
      <Label>Plaats</Label>
      <Popover open={openLocation} onOpenChange={setOpenLocation}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openLocation}
            className="w-full justify-between font-normal"
            cy-data="location-filter"
          >
            {location ? (
              location
            ) : (
              <span className="text-muted-foreground">Selecteer</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput placeholder="Zoeken..." cy-data="location-input" />
            <CommandList className="w-full">
              <CommandEmpty>Plaats niet gevonden</CommandEmpty>
              <CommandGroup className="w-full">
                {CITIES.map((city) => (
                  <CommandItem
                    key={city}
                    value={city}
                    onSelect={(currentValue) => {
                      handleLocationChange(currentValue);
                      setOpenLocation(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        location === city ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
