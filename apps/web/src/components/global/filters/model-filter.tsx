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
import { CAR_BRANDS, CAR_MODELS } from "@repo/shared/utils/constants";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@repo/ui/components/label";
import { normalizeString } from "@/utils/formatters";

export function ModelFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modelParam = searchParams.get("model");
  const brandParam = searchParams.get("brand");

  const [openModel, setOpenModel] = useState(false);
  const [model, setModel] = useState("");
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    if (brandParam) {
      const normalizedBrandParam = normalizeString(brandParam);
      const foundBrand = CAR_BRANDS.find(
        (brand) => normalizeString(brand) === normalizedBrandParam
      );
      if (foundBrand) {
        setModels(CAR_MODELS[foundBrand] || []);
        // Clear model state and remove model search parameter when brand changes
        setModel("");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("model");
        router.replace(`${window.location.pathname}?${params.toString()}`);
      } else {
        setModels([]);
        setModel("");
      }
    } else {
      setModels([]);
      setModel("");
    }
  }, [brandParam]);

  useEffect(() => {
    if (modelParam) {
      const normalizedModelParam = normalizeString(modelParam);
      const foundModel = models.find(
        (model) => normalizeString(model) === normalizedModelParam
      );
      if (foundModel) {
        setModel(foundModel);
      }
    }
  }, [modelParam, models, router, searchParams]);

  const handleModelSelect = (selectedModel: string) => {
    const currentPath = window.location.pathname;
    const params = new URLSearchParams(searchParams.toString());

    if (selectedModel === model) {
      setModel("");
      params.delete("model");
    } else {
      setModel(selectedModel);
      params.set("model", selectedModel);
    }

    setOpenModel(false);
    router.push(`${currentPath}?${params.toString()}`);
  };

  return (
    <div className="space-y-1">
      <Label>Model</Label>
      <Popover open={openModel} onOpenChange={setOpenModel}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openModel}
            disabled={!brandParam}
            className="w-full justify-between font-normal"
            cy-data="model-filter"
          >
            {model ? (
              model
            ) : (
              <span className="text-muted-foreground">Selecteer</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput placeholder="Zoeken..." cy-data="model-input" />
            <CommandList className="w-full">
              <CommandEmpty>Model niet gevonden</CommandEmpty>
              <CommandGroup className="w-full">
                {models.map((modelItem) => (
                  <CommandItem
                    key={modelItem}
                    value={modelItem}
                    onSelect={() => handleModelSelect(modelItem)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        model === modelItem ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {modelItem}
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
