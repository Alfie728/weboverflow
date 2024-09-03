"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface UseFilterProps {
  filterParamName: string;
}

const useFilter = ({ filterParamName }: UseFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get(filterParamName);
  const [filter, setFilter] = useState(currentFilter || "");
  const isFilterChangedRef = useRef(false);

  useEffect(() => {
    if (filter !== currentFilter) {
      isFilterChangedRef.current = true;
    }
  }, [filter, currentFilter]);

  useEffect(() => {
    if (filter !== currentFilter) {
      const params = new URLSearchParams(searchParams);

      if (filter) {
        params.set(filterParamName, filter);
      } else {
        params.delete(filterParamName);
      }

      // Reset page to 1 when filter changes
      params.set("page", "1");

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    }
  }, [filter, currentFilter, router, searchParams, filterParamName]);

  return { filter, setFilter };
};

export default useFilter;