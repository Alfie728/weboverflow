"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  const query = searchParams.get("global");

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);
  // console.log(search);

  useEffect(() => {
    const handleSearchBarClick = (event: any) => {
      if (searchInputRef.current === event.target) {
        setIsOpen(true);
      }
    };

    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("click", handleSearchBarClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("click", handleSearchBarClick);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);
  return (
    <div
      className="relative ml-6 w-full max-w-[500px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="relative flex min-h-[56px] grow items-center gap-1 rounded-xl bg-light-800 px-4 dark:bg-dark-300">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Search globally"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-light-800 shadow-none outline-none dark:bg-dark-300"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};
export default GlobalSearch;
