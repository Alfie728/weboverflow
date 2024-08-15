"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const useDebounce = (search: string, delay: number, key: string = "global") => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key,
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        const query = searchParams.get(key);
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: [key],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, delay);

    return () => clearTimeout(delayDebounceFn);
  }, [search, delay, pathname, router, searchParams, key]);
};

export default useDebounce;
