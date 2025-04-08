"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@repo/ui/components/label";
import { normalizeString } from "@/utils/formatters";
import { CAR_BRANDS } from "@repo/shared/utils/constants";

export function BrandFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const brandParam = searchParams.get("brand");

  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    if (brandParam) {
      const normalizedBrandParam = normalizeString(brandParam);
      const foundBrand = CAR_BRANDS.find(
        (brand) => normalizeString(brand) === normalizedBrandParam
      );
      if (foundBrand) {
        setBrand(foundBrand);
      }
    }
  }, [brandParam]);

  const handleBrandSelect = (selectedBrand: string) => {
    const currentPath = window.location.pathname;
    const params = new URLSearchParams(searchParams.toString());

    if (selectedBrand === brand) {
      setBrand("");
      params.delete("brand");
      params.delete("model");
    } else {
      setBrand(selectedBrand);
      params.set("brand", selectedBrand);
    }

    setOpen(false);
    router.push(`${currentPath}?${params.toString()}`);
  };

  return (
    <div className="space-y-1">
      <Label>Merk</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-normal"
            cy-data="brand-filter"
          >
            {brand ? (
              brand
            ) : (
              <span className="text-muted-foreground">Selecteer</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Zoeken..." cy-data="brand-input" />
            <CommandList>
              <CommandEmpty>Merk niet gevonden.</CommandEmpty>
              <CommandGroup>
                {CAR_BRANDS.map((brandItem) => (
                  <CommandItem
                    key={brandItem}
                    value={brandItem}
                    onSelect={() => handleBrandSelect(brandItem)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        brand === brandItem ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {brandItem}
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
