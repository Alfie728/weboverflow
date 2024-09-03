"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface UseFilterProps {
  filterParamName: string;
  defaultFilter: string;
}

const useFilter = ({ filterParamName, defaultFilter }: UseFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get(filterParamName);
  const [filter, setFilter] = useState(currentFilter || defaultFilter);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (!currentFilter && defaultFilter) {
        const params = new URLSearchParams(searchParams);
        params.set(filterParamName, defaultFilter.toLowerCase());
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.push(newUrl, { scroll: false });
      }
    } else if (filter !== currentFilter) {
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
  }, [filter, currentFilter, router, searchParams, filterParamName, defaultFilter]);

  return { filter, setFilter };
};

export default useFilter;
