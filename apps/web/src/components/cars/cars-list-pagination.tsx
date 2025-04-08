"use client";

import { Button } from "@repo/ui/components/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface CarsListPaginationProps {
  page: number;
  setPage: (page: number) => void;
  results: number;
  limit: number;
}

export function CarsListPagination({
  page,
  setPage,
  results,
  limit,
}: CarsListPaginationProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const handlePage = (type: "next" | "previous") => {
    let newPage = page;
    if (type === "next") {
      newPage = page + 1;
      setPage(page + 1);
    } else if (type === "previous" && page > 1) {
      newPage = page - 1;
      setPage(page - 1);
    }
    const currentPath = window.location.pathname;
    params.set("page", newPage.toString());
    router.push(`${currentPath}?${params.toString()}`);
  };

  useEffect(() => {
    const newPage = page;
    if (results <= 0) {
      setPage(newPage - 1);
    }
    const currentPath = window.location.pathname;
    params.set("page", newPage.toString());
    router.push(`${currentPath}?${params.toString()}`);
  }, [page, limit, results, router, setPage]);

  return (
    <div className="mt-5 flex w-full items-center">
      <div className="flex items-center justify-between space-x-3">
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => handlePage("previous")}
          disabled={page === 1}
        >
          Vorige
        </Button>
        <p className="text-center">Pagina: {page}</p>
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => handlePage("next")}
          disabled={results < limit}
        >
          Volgende
        </Button>
      </div>
    </div>
  );
}
