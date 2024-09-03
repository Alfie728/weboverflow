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
    // console.log('useFilter useEffect triggered');
    // console.log('Current filter:', filter);
    // console.log('Current searchParams:', searchParams.toString());

    if (isInitialMount.current) {
      // console.log('Initial mount');
      isInitialMount.current = false;
      if (!currentFilter && defaultFilter) {
        // console.log('Setting default filter');
        const params = new URLSearchParams(searchParams);
        params.set(filterParamName, defaultFilter.toLowerCase());
        // Don't change the page parameter on initial mount
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        // console.log('New URL on initial mount:', newUrl);
        router.push(newUrl, { scroll: false });
      }
    } else if (filter !== currentFilter) {
      // console.log('Filter changed');
      const params = new URLSearchParams(searchParams);

      if (filter) {
        params.set(filterParamName, filter);
      } else {
        params.delete(filterParamName);
      }

      // Only reset page to 1 if the filter actually changed
      if (filter !== currentFilter && filter !== "newest") {
        // console.log('Resetting page to 1');
        params.set('page', '1');
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      // console.log('New URL after filter change:', newUrl);
      router.push(newUrl, { scroll: false });
    }
  }, [filter, currentFilter, router, searchParams, filterParamName, defaultFilter]);

  return { filter, setFilter };
};

export default useFilter;
