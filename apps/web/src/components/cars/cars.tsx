"use client";

import { Suspense, useState } from "react";
import { CarsList } from "./cars-list";
import { FilterDialog } from "./filter-dialog";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { CarsListSuspense } from "./cars-list-suspense";
import { useRouter, useSearchParams } from "next/navigation";

export function Cars() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const [limit, setLimit] = useState(
    searchParams.get("limit")
      ? parseInt(searchParams.get("limit") as string)
      : 12
  );

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    const currentPath = window.location.pathname;
    params.set("limit", newLimit.toString());
    router.push(`${currentPath}?${params.toString()}`);
  };

  return (
    <div className="mt-5 space-y-2">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="12" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-4 mb-0">
            <TabsTrigger value="12" onClick={() => handleLimitChange(12)}>
              12
            </TabsTrigger>
            <TabsTrigger value="24" onClick={() => handleLimitChange(24)}>
              24
            </TabsTrigger>
            <TabsTrigger value="36" onClick={() => handleLimitChange(36)}>
              36
            </TabsTrigger>
            <TabsTrigger value="48" onClick={() => handleLimitChange(48)}>
              48
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Suspense fallback={<CarsListSuspense />}>
        <CarsList limit={limit} />
      </Suspense>
      <FilterDialog />
    </div>
  );
}
