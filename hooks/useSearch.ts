"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "./useDebounce";

interface UseSearchProps {
  searchParamName: string;
}

const useSearch = ({ searchParamName }: UseSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get(searchParamName);
  const [search, setSearch] = useState(query || "");
  const debouncedSearch = useDebounce(search, 300);
  const isSearchChangedRef = useRef(false);

  useEffect(() => {
    // console.log('useSearch useEffect triggered');
    // console.log('debouncedSearch:', debouncedSearch);
    // console.log('query:', query);
    if (debouncedSearch !== query) {
      const params = new URLSearchParams(searchParams);
      // console.log('Current params:', params.toString());

      if (debouncedSearch) {
        params.set(searchParamName, debouncedSearch);
      } else {
        params.delete(searchParamName);
      }

      if (isSearchChangedRef.current) {
        // console.log('Search changed, resetting page to 1');
        params.set("page", "1");
        isSearchChangedRef.current = false;
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      // console.log('New URL:', newUrl);
      router.push(newUrl, { scroll: false });
    }
  }, [debouncedSearch, query, router, searchParams, searchParamName]);

  return { search, setSearch };
};

export default useSearch;
