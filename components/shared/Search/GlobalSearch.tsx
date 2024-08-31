"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import GlobalResult from "./GlobalResult";
import useDebounce from "@/hooks/useDebounce";
import useGlobalSearchModal from "@/hooks/useGlobalSearchModal";
import { useState, LegacyRef } from "react";

const GlobalSearch = () => {
  const { isOpen, openModal, closeModal, toggleModal, modalRef, triggerRef } =
    useGlobalSearchModal();
  const [search, setSearch] = useState("");

  useDebounce(search, 500, "global");

  return (
    <div
      className="relative ml-6 w-[calc(100%-40vw)] max-w-[600px] max-lg:hidden"
      ref={modalRef}
    >
      <div className="background-light800_dark300 relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={toggleModal}
        />
        <Input
          ref={triggerRef as LegacyRef<HTMLInputElement>}
          type="text"
          placeholder="Search globally"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen && e.target.value !== "") openModal();
            if (e.target.value === "" && isOpen) closeModal();
          }}
          onFocus={() => !isOpen && openModal()}
          className="paragraph-regular no-focus placeholder border-none bg-transparent !text-dark-400 shadow-none outline-none dark:!text-light-800"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
