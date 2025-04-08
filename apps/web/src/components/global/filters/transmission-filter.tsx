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
import { TRANSMISSIONS } from "@repo/shared/utils/constants";

function normalizeString(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function TransmissionFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transmissionParam = searchParams.get("transmission");

  const [transmission, setTransmission] = useState(
    TRANSMISSIONS.find(
      (trans) =>
        normalizeString(trans) === normalizeString(transmissionParam || "")
    ) || ""
  );

  useEffect(() => {
    if (
      transmissionParam &&
      TRANSMISSIONS.some(
        (trans) => normalizeString(trans) === normalizeString(transmissionParam)
      )
    ) {
      const foundTransmission = TRANSMISSIONS.find(
        (trans) => normalizeString(trans) === normalizeString(transmissionParam)
      );
      if (foundTransmission) {
        setTransmission(foundTransmission);
      }
    }
  }, [transmissionParam]);

  const handleTransmissionChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const normalizedValue = normalizeString(value);

    if (
      TRANSMISSIONS.some((trans) => normalizeString(trans) === normalizedValue)
    ) {
      setTransmission(value);
      params.set("transmission", normalizedValue);
    } else {
      setTransmission("");
      params.delete("transmission");
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-1">
      <Label>Transmissie</Label>
      <Select
        onValueChange={handleTransmissionChange}
        value={transmission || ""}
      >
        <SelectTrigger className="w-full" cy-data="transmission-select-filter">
          <SelectValue placeholder="Selecteer">
            {transmission || "Selecteer"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {TRANSMISSIONS.map((transmission) => (
            <SelectItem key={transmission} value={transmission}>
              {transmission}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
